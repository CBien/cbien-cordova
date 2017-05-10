/********* CBKit.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <CBKit/CBKit.h>

@interface CBKit : CDVPlugin {
    // Member variables go here.
}

- (void)initialize:(CDVInvokedUrlCommand*)command;
- (void)configure:(CDVInvokedUrlCommand*)command;
//- (void)refreshTokenNeeded:(CDVInvokedUrlCommand*)command;
//- (void)setRefreshToken:(CDVInvokedUrlCommand*)command;
- (void)show:(CDVInvokedUrlCommand*)command;

@end

@implementation CBKit


- (UIColor *)colorFromHexString:(NSString *)hexString
{
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1];
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

- (void)initialize:(CDVInvokedUrlCommand*)command
{
    BOOL inProduction = [self.commandDelegate.settings[@"cbien-ios-inproduction"] boolValue];
    NSString* clientId = self.commandDelegate.settings[@"cbien-ios-clientid"];
    NSString* clientSecret = self.commandDelegate.settings[@"cbien-ios-clientsecret"];
    
    NSDictionary *options = command.arguments[0];
    NSString *uniqueIdentifier = options[@"uniqueIdentifier"];
    
    CDVPluginResult* pluginResult = nil;
    
    if(clientId != nil && clientId.length>0 && clientSecret != nil && clientSecret.length>0 && uniqueIdentifier != nil && uniqueIdentifier.length>0){
        [CBKitCore configureWithClientId:clientId secret:clientSecret uniqueIdentifier:uniqueIdentifier production:inProduction];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)configure:(CDVInvokedUrlCommand*)command
{
    NSDictionary *options = command.arguments[0];
    NSString *primaryColorHex = options[@"primaryColor"];
    NSString *colorOnPrimaryColorHex = options[@"colorOnPrimaryColorHex"];
    NSString *secondaryColorHex = options[@"secondaryColor"];
    NSString *colorOnSecondaryColorHex = options[@"colorOnSecondaryColorHex"];
    
    if(primaryColorHex){
        [CBKitCore setPrimaryColor:[self colorFromHexString:primaryColorHex]];
    }
    
    if(colorOnPrimaryColorHex){
        [CBKitCore setColorOnPrimaryColor:[self colorFromHexString:colorOnPrimaryColorHex]];
    }
    
    if(secondaryColorHex){
        [CBKitCore setSecondaryColor:[self colorFromHexString:secondaryColorHex]];
    }
    
    if(colorOnSecondaryColorHex){
        [CBKitCore setColorOnSecondaryColor:[self colorFromHexString:colorOnSecondaryColorHex]];
    }
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
/*
 -(void)refreshTokenNeeded:(CDVInvokedUrlCommand*)command
 {
 CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CBienCore refreshTokenNeeded]];
 [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
 }
 
 -(void)setRefreshToken:(CDVInvokedUrlCommand*)command
 {
 NSDictionary *options = command.arguments[0];
 NSString *refreshToken = options[@"refreshToken"];
 
 CDVPluginResult* pluginResult = nil;
 
 if(refreshToken != nil && refreshToken.length>0){
 [CBKitCore setRefreshToken:refreshToken];
 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
 } else {
 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
 }
 
 [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
 }
 */
- (void)show:(CDVInvokedUrlCommand*)command
{
    [CBKitCore show:self.viewController];
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
