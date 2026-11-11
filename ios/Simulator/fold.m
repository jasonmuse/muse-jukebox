// Folds iPhone Duo in the Simulator, and turns it, the way Xcode's Device Hub does. The cloud build
// uses it to picture the app open and propped up like a laptop, which the Simulator's own command
// line has no way to do. It runs inside the simulated iPhone (xcrun simctl spawn) and posts the
// event Device Hub's hinge slider and Rotate buttons send (worked out by
// github.com/artemnovichkov/hinge).
//
//   fold <degrees>        0 closed to 180 open flat; waits (3 seconds at most) for the hinge to get there
//   fold turn <portrait|landscape-left|landscape-right>
//
// Built for the Simulator (the cloud build does this, in .github/workflows/ios.yml):
//   xcrun -sdk iphonesimulator clang -arch arm64 -mios-simulator-version-min=26.0 -fobjc-arc \
//     -framework Foundation -framework IOKit -framework CoreMotion fold.m -o fold
//   codesign -f -s - fold

#import <Foundation/Foundation.h>
#include <mach/mach_time.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

// IOKit's HID events (private on iOS)
typedef struct __IOHIDEvent *IOHIDEventRef;
typedef struct __IOHIDEventSystemClient *IOHIDEventSystemClientRef;
extern IOHIDEventRef IOHIDEventCreateVendorDefinedEvent(CFAllocatorRef allocator, uint64_t timeStamp,
    uint32_t usagePage, uint32_t usage, uint32_t version, const uint8_t *data, CFIndex length, uint32_t options);
extern IOHIDEventSystemClientRef IOHIDEventSystemClientCreateWithType(CFAllocatorRef allocator, int type,
    CFDictionaryRef properties);
extern void IOHIDEventSystemClientDispatchEvent(IOHIDEventSystemClientRef client, IOHIDEventRef event);
extern CFDataRef IOCFSerialize(CFTypeRef object, CFOptionFlags options);

// CoreMotion's hinge angle (private: it's where UIKit reads it from)
@interface CMAngle : NSObject
- (float)angleDegrees;
- (float)mechanicalAngleDegrees;
@end

@interface CMAngleManager : NSObject
+ (BOOL)isAvailable;
- (void)startAngleUpdatesToQueue:(NSOperationQueue *)queue handler:(void (^)(CMAngle *angle))handler;
- (void)stopAngleUpdates;
@end

/// Posts one of Device Hub's controls: the hinge slider ("range", in degrees) or the Rotate buttons
/// ("enum", the way to face)
static void post(NSString *control, NSString *type, id value) {
    static IOHIDEventSystemClientRef client;
    if (!client) {
        client = IOHIDEventSystemClientCreateWithType(kCFAllocatorDefault, 4, NULL); // (a simple client)
    }
    NSDictionary *payload = @{
        @"provider": @"com.apple.Virtualization.VirtualMachines",
        @"source": control,
        @"type": type,
        @"value": value,
    };
    CFDataRef data = IOCFSerialize((__bridge CFTypeRef)payload, 1); // (binary)
    if (!client || !data) {
        fprintf(stderr, "fold: couldn't make the event\n");
        exit(1);
    }
    IOHIDEventRef event = IOHIDEventCreateVendorDefinedEvent(kCFAllocatorDefault, mach_absolute_time(), 0xFF61, 0x5B, 0,
        CFDataGetBytePtr(data), CFDataGetLength(data), 0);
    if (event) {
        IOHIDEventSystemClientDispatchEvent(client, event);
        CFRelease(event);
    }
    CFRelease(data);
}

/// The angle the hinge was moved to (newer runtimes settle `angleDegrees` a little way off it)
static double degreesOf(CMAngle *angle) {
    return [angle respondsToSelector:@selector(mechanicalAngleDegrees)] ? [angle mechanicalAngleDegrees] : [angle angleDegrees];
}

/// Folds it to `degrees`, and waits until the hinge says it's there: whether it got there
static BOOL fold(double degrees) {
    degrees = fmin(fmax(degrees, 0), 180);
    Class angles = NSClassFromString(@"CMAngleManager");
    if (!angles || ![angles isAvailable]) {
        fprintf(stderr, "fold: this simulated device has no hinge\n");
        return NO;
    }
    CMAngleManager *manager = [angles new];
    __block BOOL there = NO;
    __block double last = NAN;
    // (the updates come on the main queue, which the run loop below runs)
    [manager startAngleUpdatesToQueue:[NSOperationQueue mainQueue] handler:^(CMAngle *angle) {
        last = degreesOf(angle);
        if (fabs(last - degrees) <= 1) {
            there = YES;
        }
    }];
    post(@"hinge-slider-control", @"range", @(degrees));
    NSDate *giveUp = [NSDate dateWithTimeIntervalSinceNow:3];
    while (!there && giveUp.timeIntervalSinceNow > 0) {
        [[NSRunLoop mainRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.05]];
    }
    [manager stopAngleUpdates];
    if (!there) {
        fprintf(stderr, "fold: the hinge is at %.1f°, not %.1f°\n", last, degrees);
    }
    return there;
}

int main(int argc, char *argv[]) {
    @autoreleasepool {
        if (argc == 3 && strcmp(argv[1], "turn") == 0) {
            post(@"orientation-picker-control", @"enum", @(argv[2]));
            usleep(50000); // (time for the event to go before the process does)
            return 0;
        }
        if (argc == 2) {
            char *end;
            double degrees = strtod(argv[1], &end);
            if (end != argv[1] && *end == '\0') {
                return fold(degrees) ? 0 : 1;
            }
        }
        fprintf(stderr, "usage: fold <degrees: 0 closed to 180 open> | fold turn <portrait|landscape-left|landscape-right>\n");
        return 64;
    }
}
