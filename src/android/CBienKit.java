package com.cbien.android.sdk;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import com.cbien.sdk.CBien;

public class CBienKit extends CordovaPlugin {

    String clientId;
    String clientSecret;

    String uniqueIdentifier;
    String refreshToken;

    boolean inproduction = false;

    boolean asIcon = false;

    String font;

    String primaryColor;
    String secondaryColor;
    String stuffColor;
    String vehicleColor;
    String domainColor;
    String headerBackgroundColor;
    String headerTextIconColor;
    String headerIndicatorColor;

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

            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, CBien.needToken(cordova.getActivity())));
        }
        else if (action.equals("setRefreshToken")) {

            this.refreshToken = args.getJSONObject(0).getString("refreshToken");

            callbackContext.success();
        }
        else if (action.equals("configure")) {

            if(args.getJSONObject(0).has("font")) {

                if(args.getJSONObject(0).getInt("font") == 1) {

                    this.font = "helvetica";
                }
                else if(args.getJSONObject(0).getInt("font") == 2) {

                    this.font = "lato";
                }
            }

            this.asIcon = args.getJSONObject(0).has("buttonType") && args.getJSONObject(0).getInt("buttonType") == 1;
            
            this.primaryColor = args.getJSONObject(0).getString("primaryColor");
            this.secondaryColor = args.getJSONObject(0).getString("secondaryColor");
            this.stuffColor = args.getJSONObject(0).getString("stuffColor");
            this.vehicleColor = args.getJSONObject(0).getString("vehicleColor");
            this.domainColor = args.getJSONObject(0).getString("domainColor");
            this.headerBackgroundColor = args.getJSONObject(0).getString("headerBackgroundColor");
            this.headerTextIconColor = args.getJSONObject(0).getString("headerTextIconColor");
            this.headerIndicatorColor = args.getJSONObject(0).getString("headerIndicatorColor");

            callbackContext.success();
        }
        else if (action.equals("show")) {

            CBien.Args cbienArgs = new CBien.Args(clientId, clientSecret)
                    .setInProduction(inproduction)
                    .setFont(font)
                    .setAsIcon(asIcon);

            if(refreshToken != null) {

                cbienArgs.setRefreshToken(refreshToken);
            }
            if(uniqueIdentifier != null) {

                cbienArgs.setUniqueIdentifier(uniqueIdentifier);
            }
            if(primaryColor != null) {

                cbienArgs.setPrimaryColor(primaryColor);
            }
            if(secondaryColor != null) {

                cbienArgs.setSecondaryColor(secondaryColor);
            }
            if(stuffColor != null) {

                cbienArgs.setStuffColor(stuffColor);
            }
            if(vehicleColor != null) {

                cbienArgs.setVehicleColor(vehicleColor);
            }
            if(domainColor != null) {

                cbienArgs.setDomainColor(domainColor);
            }
            if(headerBackgroundColor != null) {

                cbienArgs.setHeaderBackgroundColor(headerBackgroundColor);
            }
            if(headerTextIconColor != null) {

                cbienArgs.setHeaderTextIconColor(headerTextIconColor);
            }
            if(headerIndicatorColor != null) {

                cbienArgs.setHeaderIndicatorColor(headerIndicatorColor);
            }

            CBien.start(cordova.getActivity(), cbienArgs);

            callbackContext.success();
        }

        return true;
    }
}
