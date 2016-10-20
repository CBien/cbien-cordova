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
    boolean inproduction;
    String uniqueIdentifier;
    String refreshToken;
    String logo;
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

        callbackContext.success();

        if (action.equals("initialize")) {

            this.uniqueIdentifier = args.getJSONObject(0).getString("uniqueIdentifier");
            if(args.getJSONObject(0).has("refreshToken")) {

                this.refreshToken = args.getJSONObject(0).getString("refreshToken");
            }
            else {

                this.refreshToken = "";
            }
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
                        secondaryColor,
                        logo);
            }
        }

        return true;
    }
}
