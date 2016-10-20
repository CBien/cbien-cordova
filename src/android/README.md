# CBienKit SDK Android 

## Installation

Le SDK Android de CBien est un module au format aar, qui peut être intégré dans votre application depuis Android Studio.

Ouvrez votre application dans Android Studio, puis aller dans 'File → Project Structure …'.

Cliquer sur le 'plus' vert en haut à gauche, puis sélectionner 'Import .JAR/.AAR Package'.

Récupérer le fichier 'cbien.aar' et valider.

Attendez que l'application finisse de builder, puis fermez la page.

## Ajout des dépendences

Allez ensuite dans le 'build.gradle' de votre module principale (nommé 'app'), puis ajouter ces lignes dans la balise 'dependencies' :

    compile 'com.android.support:multidex:1.+'
    compile 'com.android.support:appcompat-v7:23.+'
    compile 'com.android.support:design:23.+'
    compile 'com.android.support:recyclerview-v7:23.+'
    compile 'com.android.support:cardview-v7:23.+'
    compile 'com.android.support:customtabs:23.+'
    compile 'com.google.code.gson:gson:2.+'
    compile 'com.google.zxing:core:3.+'
    compile 'com.squareup.okio:okio:1.+'
    compile ('com.squareup.okhttp3:okhttp:3.+')
    {exclude module:'com,squareup,okio'}
    compile ('com.squareup.retrofit2:retrofit:2.+')
    {exclude module: 'com.squareup.okio'}
    compile ('com.squareup.retrofit2:converter-gson:2.+')
    {exclude module: 'com.squareup.okio'}
    compile 'com.squareup.picasso:picasso:2.5.2'
    compile 'com.commit451:PhotoView:1.2.5'
    compile 'com.journeyapps:zxing-android-embedded:3.0.2@aar'
    compile project(':cbien')

Il ne reste plus qu'a synchroniser votre projet en cliquant sur le bouton 'Sync Now' qui est apparut en haut à droite.

## Configuration

Une fois le SDK installé, vous aurez accès à la classe com.cbien.cbiensdk.CbienSDK.

Il vous suffira donc simplement d'utiliser la méthode CbienSDK.start(…); pour lancer le SDK CBien.

La méthode 'start' peut être appelé de deux façons différentes.

L'utilisation complête :

    CbienSDK.start(Activity currentActivity, 
        String, clientId, 
        String clientSecret, 
        boolean inproduction, 
        String uniqueIdentifier, 
        String refreshToken, 
        String primaryColorHexa, 
        String secondaryColorHexa, 
        String logoBase64);

L'utilisation simple :

    CbienSDK.start(Activity currentActivity, 
        String, clientId, 
        String clientSecret, 
        boolean inproduction, 
        String uniqueIdentifier, 
        String refreshToken);

Le paramètre currentActivity est l'activité depuis lequel est lancé le SDK.

Le paramètre clientId est votre clientId permettant la connexion à l'api CBien.

Le paramètre clientSecret est votre clientSecret permettant la connexion à l'api CBien.

Le paramètre inproduction permet d'utiliser l'api en prod ou celle destiné aux partenaires.

Le paramètre uniqueIdentifier est l'identifiant sociétaire utilisant votre application.

Le paramètre refreshToken permet une synchronisation des compte entre le web et le mobile, optionnel, peut être vide ou null.

Les paramètres primaryColorHexa et secondaryColorHexa sont les couleurs du thème utilisé par le SDK, elles sont à renseigner en hexadécimal, exemple : '#8822EE'.
Dans l'utilisation simple du SDK, les couleurs utiliser sont les couleurs de CBien (bleu et vert).

Le paramètre logoBase64 est le logo affiché dans le SDK, il sera suivis de 'en partenariat avec Cbien.com'.
Le logo doit être une chaine de caractère au format Base64.
Dans l'utilisation simple du SDK, aucune logo ne sera affiché.

Vous aurez aussi accès à la méthode needToken(Activity currentActivity), 
qui pemert de savoir si vous devez renseignez le paramètre 'refreshToken' ou le laisser null.

