# CBienKit for Cordova

This is a plugin that allows your Cordova app to use CBienKit for iOS.

## Requirements

CBienKit for iOS supports iOS 8.x and above. 

## Installation

To install the plugin in your Cordova app, run the following:

    npm install xcode
    cordova plugin add cordova-plugin-cbienkit
    cordova plugin add cordova-plugin-add-swift-support --save
    
## Configuring 

To configure CBienKit, you must add your app's keys to your `config.xml`:

    <preference name="cbien-ios-clientid" value="your_client_id"/>
    <preference name="cbien-ios-clientsecret" value="your_client_secret"/>

## Use

1. Firstly, on successful completion of login (or wherever you check your user's authenticated state when your app starts up) you will need to initialize with user's identifier.

        CBienKit.initialize({uniqueIdentifier: "unique_identifier"})

2. Also, you can customize logo and colors (all parameters are optional)

        CBienKit.configure({logo:"logo_base64", primaryColor:"#004B9B", colorOnPrimaryColorHex:"#FFFFFF",  secondaryColor:"#FDC600", colorOnSecondaryColorHex:"#FFFFFF"})

3. Finally, display CBien screens.

        CBienKit.show()

## License

cbien-cordova is released under the [MIT License](http://www.opensource.org/licenses/MIT).

## Copyright

Copyright (c) 2016, Inc.  All rights reserved.