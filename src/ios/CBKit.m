/********* CBKit.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <CBKit/CBKit.h>

@interface CBKit : CDVPlugin {
    // Member variables go here.
}

- (void)initialize:(CDVInvokedUrlCommand*)command;
- (void)configure:(CDVInvokedUrlCommand*)command;
- (void)refreshTokenNeeded:(CDVInvokedUrlCommand*)command;
- (void)setRefreshToken:(CDVInvokedUrlCommand*)command;
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
    
    if (options) {
        NSString *primaryColorHex = options[@"primaryColor"];
        NSString *colorOnPrimaryColorHex = options[@"colorOnPrimaryColor"];
        NSString *secondaryColorHex = options[@"secondaryColor"];
        NSString *colorOnSecondaryColorHex = options[@"colorOnSecondaryColor"];
        
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
        
        
        NSString *stuffColorHex = options[@"stuffColor"];
        NSString *vehicleColorHex = options[@"vehicleColor"];
        NSString *domainColorHex = options[@"domainColor"];
        
        if(stuffColorHex) {
            [CBKitCore setStuffColor:[self colorFromHexString:stuffColorHex]];
        }
        
        if(vehicleColorHex) {
            [CBKitCore setVehicleColor:[self colorFromHexString:vehicleColorHex]];
        }
        
        if(domainColorHex) {
            [CBKitCore setDomainColor:[self colorFromHexString:domainColorHex]];
        }
        
        NSString *headerBackgroundColorHex = options[@"headerBackgroundColor"];
        NSString *headerTextColorHex = options[@"headerTextIconColor"];
        NSString *headerSelectorColorHex = options[@"headerIndicatorColor"];
        
        if(headerBackgroundColorHex) {
            [CBKitCore setHeaderBackgroundColor:[self colorFromHexString:headerBackgroundColorHex]];
        }
        
        if(headerTextColorHex) {
            [CBKitCore setHeaderTextColor:[self colorFromHexString:headerTextColorHex]];
        }
        
        if(headerSelectorColorHex) {
            [CBKitCore setHeaderSelectorColor:[self colorFromHexString:headerSelectorColorHex]];
        }
        
        NSNumber *buttonTypeValue = options[@"buttonType"];
        if (buttonTypeValue) {
            CBKitButtonType buttonType = [buttonTypeValue intValue];
            [CBKitCore setButtonType:buttonType];
        }
        
        NSNumber *fontValue = options[@"font"];
        if (fontValue) {
            CBKitFont font = [fontValue intValue];
            [CBKitCore setFont:font];
        }
    }
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)refreshTokenNeeded:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CBKitCore refreshTokenNeeded]];
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

- (void)show:(CDVInvokedUrlCommand*)command
{
    [CBKitCore show:self.viewController];
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
