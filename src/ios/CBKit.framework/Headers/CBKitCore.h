//
//  CBKitCore.h
//  CBKit
//
//  Created by Allan on 23/02/2017.
//  Copyright © 2017 CBien. All rights reserved.
//

typedef NS_ENUM(NSInteger, CBKitButtonType) {
    CBKitButtonTypeImage,
    CBKitButtonTypeIcon,
};

typedef NS_ENUM(NSUInteger, CBKitFont) {
    CBKitFontDefault,
    CBKitFontHelvetica,
    CBKitFontLato,
    CBKitFontRoboto,
};

@interface CBKitCore : NSObject

+(void)configureWithClientId:(nonnull NSString*)clientId
                      secret:(nonnull NSString*)secret
            uniqueIdentifier:(nonnull NSString*)uniqueIdentifier
                  production:(BOOL)production;

+(BOOL)refreshTokenNeeded;
+(void)setRefreshToken:(NSString *_Nonnull)refreshToken;

+(void)setPrimaryColor:(nonnull UIColor*)color;
+(void)setColorOnPrimaryColor:(nonnull UIColor*)color;
+(void)setSecondaryColor:(nonnull UIColor*)color;
+(void)setColorOnSecondaryColor:(nonnull UIColor*)color;

+(void)setStuffColor:(nonnull UIColor*)color;
+(void)setVehicleColor:(nonnull UIColor*)color;
+(void)setDomainColor:(nonnull UIColor*)color;
    
+(void)setHeaderBackgroundColor:(nonnull UIColor*)color;
+(void)setHeaderTextColor:(nonnull UIColor*)color;
+(void)setHeaderSelectorColor:(nonnull UIColor*)color;

+(void)setButtonType:(CBKitButtonType)buttonType;
+(void)setFont:(CBKitFont)font;

+(void)show:(nonnull UIViewController*)controller;

@end
