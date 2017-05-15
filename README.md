# CBKit for Cordova

This is a plugin that allows your Cordova app to use CBKit for iOS and Android.

## Supported Platforms

- Android 4.0.3+ (API15)
- iOS 8.0+

## Installation

To install the plugin in your Cordova app, run the following:

    cordova plugin add https://github.com/CBien/cbien-cordova.git

Add xcode package (iOS only) :

    npm install xcode

## Configuring 

To configure CBienKit, you must add domains names and your app's keys to your `config.xml`:
```js
<access origin="http://*.cbien.com"></access>
<access origin="http://cbien-partner.herokuapp.com"></access>
<access origin="http://*.amazonaws.com"></access>
<access origin="http://*.newrelic.com"></access>
<access origin="http://*.nr-data.net"></access>
<access origin="http://*.googleapis.com"></access>

<preference name="cbien-ios-clientid" value="your_client_id_for_ios"/>
<preference name="cbien-ios-clientsecret" value="your_client_secret_for_ios"/>
<preference name="cbien-ios-inproduction" value="true_or_false"/>

<preference name="cbien-android-clientid" value="your_client_id_for_android"/>
<preference name="cbien-android-clientsecret" value="your_client_secret_for_android"/>
<preference name="cbien-android-inproduction" value="true_or_false"/>
```
## Use

1. Firstly, on successful completion of login (or wherever you check your user's authenticated state when your app starts up) you will need to initialize with user's identifier.

```js
CBienKit.initialize({
  uniqueIdentifier: "unique_identifier"
});
```

2. Also, you can customize colors (all parameters are optional)

```js
CBienKit.configure({
  primaryColor : "#004B9B", 
  colorOnPrimaryColor : "#FFFFFF",  // iOS only
  secondaryColor : "#FDC600", 
  colorOnSecondaryColor : "#FFFFFF", // iOS only
  stuffColor : "#41F4C4",
  vehicleColor : "#636C8C",
  domainColor : "#D39ACC",
  headerBackgroundColor : "#FF3730",
  headerTextColor : "#684514",
  headerSelectorColor : "#E4FF6D",
  buttonType : CBKit.ButtonType.ICON,
  font : CBKit.Font.ROBOTO,
});
```

4. Check if new refresh token needed and set a new one (Optional)

```js
CBienKit.refreshTokenNeeded( function(needed) { 
  if (needed) {
    CBienKit.setRefreshToken({refreshToken: "refresh_token"}); 
  } 
});
```

3. Finally, display CBien screens.

```js
CBienKit.show();
```


### CBKit.FontType : ```enum```
**Kind**: static enum property of ```CBKit```
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| DEFAULT | ```number``` | ```0``` | Return default font |
| HELVETICA | ```number``` | ```1``` | Return Helvetica font |
| LATO | ```number``` | ```2``` | Return Lato font |
| ROBOTO | ```number``` | ```3``` | Return Roboto font |

### CBKit.ButtonType : ```enum```
**Kind**: static enum property of ```CBKit```
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| IMAGE | ```number``` | ```0``` | Return image |
| ICON | ```number``` | ```1``` | Return Helvetica font |

## License

cbien-cordova is released under the [MIT License](http://www.opensource.org/licenses/MIT).

## Copyright

Copyright (c) 2017, Inc.  All rights reserved.
