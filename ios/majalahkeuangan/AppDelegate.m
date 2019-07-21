/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <Firebase/Firebase.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <TwitterKit/TWTRKit.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin/RNGoogleSignin.h>

@implementation AppDelegate

//under twitter and facebook imports
#define TWITTER_SCHEME @"twitterkit-D3g97AOOvTFomVU0vaHBlTMcg"
//this one did the trick
#define TWITTER_SCHEME_LOWER @"twitterkit-d3g97aoovtfomvu0vahbltmcg"
#define FACEBOOK_SCHEME  @"fb2395555487341257"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"MajalahKeuangan"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
  
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
  {
//    NSString *stringurl = url.absoluteString;
//    NSString *sub = @"twitterkit";
//    NSRange range = [stringurl  rangeOfString: sub options: NSCaseInsensitiveSearch];
//    if (range.location != NSNotFound){
//      return [[Twitter sharedInstance] application:application openURL:url options:options];
//    }
//    else{
//      BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
//                      ] || [RNGoogleSignin application:application
//                                               openURL:url
//                                     sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                                            annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
//                            ];;
//      return handled;
//    }
//    return [[Twitter sharedInstance] application:application openURL:url options:options];
    if ([[url scheme] isEqualToString:TWITTER_SCHEME] || [[url scheme] isEqualToString:TWITTER_SCHEME_LOWER]){
      NSLog(@"This one doesn't work");
      return [[Twitter sharedInstance] application:application openURL:url options:options];
    } else if ([[url scheme] isEqualToString:FACEBOOK_SCHEME]) {
      return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                            openURL:url
                                                  sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                         annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
              ];
    } else {
      return [RNGoogleSignin application:application
                                 openURL:url
                       sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                              annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
    }
    
    return NO;
  }


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
