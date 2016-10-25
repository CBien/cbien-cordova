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

#### Obligatoire :
    - currentActivity : l'activité depuis lequel est lancé le SDK.
    - clientId : votre clientId permettant la connexion à l'api CBien.
    - clientSecret : votre clientSecret permettant la connexion à l'api CBien.
    - inproduction : permet d'utiliser l'api en prod ou celle destiné aux partenaires.
    - uniqueIdentifier : l'identifiant sociétaire utilisant votre application.

#### Optionnel :
    - refreshToken : permet la vérification de l’éligibilité du sociétaire à l’offre. Si aucun refresh token n’est renseigné, l'utilisateur est considéré comme éligible. Vous avez accès à la méthode "needToken(Activity currentActivity)", qui permet de savoir si vous devez renseignez un nouveau refresh_token.
    - primaryColorHexa et <secondaryColorHexa> : couleurs du thème utilisé par le SDK (hexadécimal, exemple : '#8822EE').
    - logoBase64 : votre logo affiché dans le SDK (chaine de caractère au format Base64).
