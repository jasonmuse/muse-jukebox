import Combine
import MediaAccessibility
import UIKit
import WebKit

/// Sets up the web view for the jukebox and talks to the page in it: tells it whether iOS's Music
/// Haptics setting is on (and when that changes), plays the taps it sends, and opens links that go
/// elsewhere (itch.io, Ko-fi, the App Store) in their own apps.
///
/// What the page and the app say to each other (script.js, "Haptics: feel the music"):
/// - `window.museApp = { haptics, musicHaptics }`, set before the page's own code runs: whether this
///   device can tap (most iPads can't), and whether Music Haptics is on
/// - a `museappchange` event on `window` (`detail: { musicHaptics }`) when Music Haptics is turned
///   on or off
/// - `window.webkit.messageHandlers.museHaptics.postMessage(...)` from the page:
///   `{ type: "taps", taps: [[delay (s), intensity (0–1), sharpness (0–1)], ...] }` to play,
///   `{ type: "stop" }` to call back the taps that haven't landed (the song's paused or moved), and
///   `{ type: "vibrate", pattern: [ms, ...] }` from `navigator.vibrate`, which the app adds for Jukebot
@MainActor
final class JukeboxBridge: NSObject, ObservableObject {
    nonisolated static let host = "muse-jukebox.pages.dev"
    nonisolated static let home = URL(string: "https://muse-jukebox.pages.dev/")!
    nonisolated static let channel = "museHaptics"

    /// The jukebox couldn't be loaded (no connection, and nothing kept from last time)
    @Published private(set) var unreachable = false

    private let haptics = HapticsPlayer()
    private weak var webView: WKWebView?
    private var musicHapticsOn = MAMusicHapticsManager.shared.isActive
    private var observers: [NSObjectProtocol] = []

    override init() {
        super.init()
        let center = NotificationCenter.default
        // Music Haptics turned on or off (looked at again on coming back, in case it was changed
        // while the jukebox was away)
        for name in [MAMusicHapticsManager.activeStatusDidChangeNotification, UIApplication.didBecomeActiveNotification] {
            observers.append(center.addObserver(forName: name, object: nil, queue: .main) { [weak self] _ in
                MainActor.assumeIsolated {
                    guard let self else { return }
                    self.checkMusicHaptics()
                }
            })
        }
        // No taps in the background (the page stops sending them while it's out of sight too)
        observers.append(center.addObserver(forName: UIApplication.didEnterBackgroundNotification, object: nil, queue: .main) { [weak self] _ in
            MainActor.assumeIsolated {
                guard let self else { return }
                self.haptics.stop()
            }
        })
    }

    func makeWebView() -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        // (the jukebox is an app-bound domain, in Info.plist: that lets its service worker keep it
        // and the songs you've listened to, for when there's no signal)
        configuration.limitsNavigationsToAppBoundDomains = true
        configuration.userContentController.add(self, name: Self.channel)
        configuration.userContentController.addUserScript(startScript())

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        #if DEBUG
        webView.isInspectable = true // (Safari's Develop menu can look inside)
        #endif
        webView.load(URLRequest(url: Self.home))
        self.webView = webView
        return webView
    }

    func reload() {
        unreachable = false
        webView?.load(URLRequest(url: Self.home))
    }

    /// What the page knows from the start (and Jukebot's buzzes: navigator.vibrate, which Safari
    /// doesn't have, comes here as taps)
    private func startScript() -> WKUserScript {
        let source = """
            window.museApp = { haptics: \(HapticsPlayer.isSupported), musicHaptics: \(musicHapticsOn) };
            if (window.museApp.haptics && typeof navigator.vibrate !== "function") {
                navigator.vibrate = function (pattern) {
                    try {
                        window.webkit.messageHandlers.\(Self.channel).postMessage({ type: "vibrate", pattern: [].concat(pattern).map(Number) });
                        return true;
                    } catch (error) {
                        return false;
                    }
                };
            }
            """
        return WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: true)
    }

    /// Music Haptics turned on or off: the page is told (and pages loaded from now on start out knowing)
    private func checkMusicHaptics() {
        let on = MAMusicHapticsManager.shared.isActive
        guard on != musicHapticsOn else { return }
        musicHapticsOn = on
        guard let webView else { return }
        let controller = webView.configuration.userContentController
        controller.removeAllUserScripts()
        controller.addUserScript(startScript())
        webView.evaluateJavaScript("""
            if (window.museApp) window.museApp.musicHaptics = \(on);
            window.dispatchEvent(new CustomEvent("museappchange", { detail: { musicHaptics: \(on) } }));
            """, completionHandler: nil)
    }

    private func receive(_ body: [String: Any]) {
        guard let type = body["type"] as? String else { return }
        switch type {
        case "taps":
            haptics.play(Self.taps(in: body["taps"]))
        case "stop":
            haptics.stop()
        case "vibrate":
            haptics.vibrate((body["pattern"] as? [NSNumber])?.map(\.doubleValue) ?? [])
        default:
            break
        }
    }

    /// The page's taps: [delay (s), intensity (0–1), sharpness (0–1)] each
    private static func taps(in value: Any?) -> [HapticsPlayer.Tap] {
        guard let list = value as? [Any] else { return [] }
        return list.prefix(64).compactMap { item in
            guard let numbers = item as? [NSNumber], numbers.count >= 3 else { return nil }
            return HapticsPlayer.Tap(
                delay: min(max(numbers[0].doubleValue, 0), 2),
                intensity: numbers[1].floatValue,
                sharpness: numbers[2].floatValue
            )
        }
    }

    private static func isJukebox(_ url: URL) -> Bool {
        url.host == host || ["about", "blob", "data"].contains(url.scheme ?? "")
    }
}

// MARK: - The page's messages

extension JukeboxBridge: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        // Only from the jukebox itself (not a page it's gone to, or a frame inside it)
        guard message.frameInfo.isMainFrame,
              message.frameInfo.securityOrigin.host == Self.host,
              let body = message.body as? [String: Any] else { return }
        receive(body)
    }
}

// MARK: - Loading, and links that go elsewhere

extension JukeboxBridge: WKNavigationDelegate {
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping @MainActor @Sendable (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else {
            decisionHandler(.cancel)
            return
        }
        if Self.isJukebox(url) {
            decisionHandler(.allow)
            return
        }
        // Anywhere else opens in its own app (Safari, the App Store...)
        decisionHandler(.cancel)
        if navigationAction.targetFrame?.isMainFrame ?? true {
            UIApplication.shared.open(url)
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        unreachable = false
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        let error = error as NSError
        if error.domain == NSURLErrorDomain && error.code != NSURLErrorCancelled {
            unreachable = true
        }
    }

    // (the page's process quit, to free memory say: it's opened again)
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        haptics.stop()
        webView.reload()
    }
}

extension JukeboxBridge: WKUIDelegate {
    // Links that open a new window (target="_blank") go to their own app too
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url {
            if Self.isJukebox(url) {
                webView.load(navigationAction.request)
            } else {
                UIApplication.shared.open(url)
            }
        }
        return nil
    }
}
