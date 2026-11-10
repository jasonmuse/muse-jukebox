import SwiftUI
import WebKit

/// The jukebox, edge to edge (the page keeps clear of the notch and the home bar itself), with a
/// note to try again if it can't be reached
struct JukeboxScreen: View {
    @StateObject private var bridge = JukeboxBridge()

    var body: some View {
        ZStack {
            Color("LaunchBackground")
                .ignoresSafeArea()
            JukeboxWebView(bridge: bridge)
                .ignoresSafeArea()
            if bridge.unreachable {
                VStack(spacing: 12) {
                    Text("Can't reach the jukebox")
                        .font(.headline)
                    Text("Check your connection, then try again.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    Button("Try again") {
                        bridge.reload()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(Color(red: 1, green: 0.53, blue: 0.84))
                }
                .multilineTextAlignment(.center)
                .padding(28)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 22))
                .padding(24)
            }
        }
        .preferredColorScheme(.dark)
    }
}

/// The page itself, in the web view the bridge sets up
private struct JukeboxWebView: UIViewRepresentable {
    let bridge: JukeboxBridge

    func makeUIView(context: Context) -> WKWebView {
        bridge.makeWebView()
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}
}
