# CBienKit for Cordova

This is a plugin that allows your Cordova app to use CBienKit for iOS and Android.

## Requirements

CBienKit supports iOS 8.0 and above and Android 4.0.3 (API15) and above. 

## Installation

To install the plugin in your Cordova app, run the following:

    npm install xcode
    cordova plugin add cordova-plugin-cbienkit

## Configuring 

To configure CBienKit, you must add domains names and your app's keys to your `config.xml`:

    <access origin="http://*.cbien.com"></access>
    <access origin="http://cbien-partner.herokuapp.com"></access>
    <access origin="http://*.amazonaws.com"></access>
    <access origin="http://*.newrelic.com"></access>
    <access origin="http://*.nr-data.net"></access>
    <access origin="http://*.googleapis.com"></access>

    <preference name="cbien-ios-inproduction" value="true"/>
    <preference name="cbien-ios-clientid" value="your_client_id_for_ios"/>
    <preference name="cbien-ios-clientsecret" value="your_client_secret_for_ios"/>
    <preference name="cbien-ios-inproduction" value="true_or_false"/>

    <preference name="cbien-android-clientid" value="your_client_id_for_android"/>
    <preference name="cbien-android-clientsecret" value="your_client_secret_for_android"/>
    <preference name="cbien-android-inproduction" value="true_or_false"/>

## Use

1. Firstly, on successful completion of login (or wherever you check your user's authenticated state when your app starts up) you will need to initialize with user's identifier.

        CBienKit.initialize({uniqueIdentifier: "unique_identifier"})

        or

        CBienKit.initialize({uniqueIdentifier: "unique_identifier", refreshToken: "refresh_token"})

2. Also, you can customize logo and colors (all parameters are optional)

        CBienKit.configure({logo:"logo_base64", primaryColor:"#004B9B", colorOnPrimaryColorHex:"#FFFFFF",  secondaryColor:"#FDC600", colorOnSecondaryColorHex:"#FFFFFF"})

4. Check if new refresh token needed and set a new one (Optional)

        CBienKit.refreshTokenNeeded(function(needed) { if(needed){ CBienKit.setRefreshToken({refreshToken: "refresh_token"}); } });

3. Finally, display CBien screens.

        CBienKit.show()

## License

cbien-cordova is released under the [MIT License](http://www.opensource.org/licenses/MIT).

## Copyright

Copyright (c) 2016, Inc.  All rights reserved.
