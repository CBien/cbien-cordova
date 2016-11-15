//
//  CBien.h
//  CBienKit
//
//  Created by Allan Mourey on 18/03/2016.
//  Copyright © 2016 cbien. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CBienCore : NSObject

/**
 *  Configure the SDK before call 'show:'
 *
 *  @param clientId             Your client_id
 *  @param secret               Your client_secret
 *  @param uniqueIdentifier     User identifier
 *  @param inProduction         Choose beetween Production or Staging
 */
+(void)configureWithClientId:(NSString *_Nonnull)clientId secret:(NSString *_Nonnull)secret uniqueIdentifier:(NSString *_Nonnull)uniqueIdentifier inProduction:(BOOL)inProduction;

/**
 *  Check if refresh token needed
 *
 */
+(BOOL)refreshTokenNeeded;

/**
 *  Set the user refresh token
 *
 *  @param refreshToken The refresh token
 */
+(void)setRefreshToken:(NSString *_Nonnull)refreshToken;

/**
 *  Show login or dashboard
 *
 *  @param controller The controller that call the function
 */
+(void)show:(UIViewController*_Nonnull)controller;

/**
 *  Configure the primary color
 *
 *  @param color The UIColor
 */
+(void)setPrimaryColor:(UIColor*_Nonnull)color;

/**
 *  Configure the color on primary color
 *
 *  @param color The UIColor
 */
+(void)setColorOnPrimaryColor:(UIColor*_Nonnull)color;

/**
 *  Configure the secondary color
 *
 *  @param color The UIColor
 */
+(void)setSecondaryColor:(UIColor*_Nonnull)color;

/**
 *  Configure the color on secondary color
 *
 *  @param color The UIColor
 */
+(void)setColorOnSecondaryColor:(UIColor*_Nonnull)color;

@end
