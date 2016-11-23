package com.cbien.android.sdk;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import com.cbien.sdk.CBienSDk;

public class CBienKit extends CordovaPlugin {

    String clientId;
    String clientSecret;
    boolean inproduction;
    String uniqueIdentifier;
    String refreshToken;
    String primaryColor;
    String secondaryColor;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        clientId = preferences.getString("cbien-android-clientid", null);
        clientSecret = preferences.getString("cbien-android-clientsecret", null);
        inproduction = Boolean.valueOf(preferences.getString("cbien-android-inproduction", "false"));
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

        if (action.equals("initialize")) {

            this.uniqueIdentifier = args.getJSONObject(0).getString("uniqueIdentifier");

            callbackContext.success();
        }
        else if (action.equals("refreshTokenNeeded")) {

            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, CBienSDk.needToken(cordova.getActivity())));
        }
        else if (action.equals("setRefreshToken")) {

            this.refreshToken = args.getJSONObject(0).getString("refreshToken");

            callbackContext.success();
        }
        else if (action.equals("configure")) {
            
            this.primaryColor = args.getJSONObject(0).getString("primaryColor");
            this.secondaryColor = args.getJSONObject(0).getString("secondaryColor");

            callbackContext.success();
        }
        else if (action.equals("show")) {

            if(primaryColor == null || secondaryColor == null) {

                CBienSDk.start(cordova.getActivity(),
                        clientId,
                        clientSecret,
                        inproduction,
                        uniqueIdentifier,
                        refreshToken);
            }
            else {

                CBienSDk.start(cordova.getActivity(),
                        clientId,
                        clientSecret,
                        inproduction,
                        uniqueIdentifier,
                        refreshToken,
                        primaryColor,
                        secondaryColor);
            }

            callbackContext.success();
        }

        return true;
    }
}
