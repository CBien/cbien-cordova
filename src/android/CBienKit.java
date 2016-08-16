package com.cbien.android.sdk;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import com.cbien.sdk.CBienSDk;

public class CBienKit extends CordovaPlugin {

    String clientId;
    String clientSecret;
    String uniqueIdentifier;
    String logo;
    String primaryColor;
    String secondaryColor;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        clientId = preferences.getString("cbien-android-clientid", null);
        clientSecret = preferences.getString("cbien-android-clientsecret", null);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

        callbackContext.success();

        if (action.equals("initialize")) {

            this.uniqueIdentifier = args.getJSONObject(0).getString("uniqueIdentifier");
        }
        else if (action.equals("configure")) {
            
            this.logo = args.getJSONObject(0).getString("logo");
            this.primaryColor = args.getJSONObject(0).getString("primaryColor");
            this.secondaryColor = args.getJSONObject(0).getString("secondaryColor");
        }
        else if (action.equals("show")) {

            if(logo == null || primaryColor == null || secondaryColor == null) {

                CBienSDk.start(cordova.getActivity(),
                        clientId,
                        clientSecret,
                        uniqueIdentifier);
            }
            else {

                CBienSDk.start(cordova.getActivity(),
                        clientId,
                        clientSecret,
                        uniqueIdentifier,
                        secondaryColor,
                        primaryColor,
                        logo);
            }
        }

        return true;
    }
}
