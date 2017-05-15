# CBienKit SDK Android 

## Installation

Le SDK Android de CBien est un module au format .aar, qui peut être intégré dans votre application depuis Android Studio.

Ouvrez votre application dans Android Studio, puis allez dans 'File → Project Structure …'.

Cliquez sur le 'plus' vert en haut à gauche, puis sélectionnez 'Import .JAR/.AAR Package'.

Récupérez le fichier 'cbien.aar' et validez.

Attendez que l'application finisse de builder, puis fermez la page.

## Ajout des dépendences

Allez dans le fichier 'build.gradle' de votre projet puis :

- dans la balise 'repositories' de 'allprojects' ajoutez ces lignes :

    jcenter()
    maven { url "https://jitpack.io" }

- dans la balise 'dependencies' de 'buildscript' ajoutez cette ligne :

    classpath "io.realm:realm-gradle-plugin:2.2.0"

Allez ensuite dans le fichier 'build.gradle' de votre module principale (nommé 'app') puis :

- dans la balise 'dependencies' ajoutez ces lignes :

    compile project(':cbien')

    compile 'com.android.support:multidex:1.+'
    compile 'com.android.support:appcompat-v7:25.+'
    compile 'com.android.support:design:25.+'
    compile 'com.android.support:recyclerview-v7:25.+'
    compile 'com.android.support:cardview-v7:25.+'
    compile 'com.android.support:customtabs:25.+'

    compile 'com.google.zxing:core:3.+'
    compile 'com.google.code.gson:gson:2.+'

    compile 'com.squareup.okio:okio:1.+'
    compile ('com.squareup.okhttp3:okhttp:3.+') { exclude module: 'com.squareup.okio' }
    compile ('com.squareup.retrofit2:retrofit:2.+') { exclude module: 'com.squareup.okio' }
    compile ('com.squareup.retrofit2:converter-gson:2.+') { exclude module: 'com.squ+areup.okio' }
    compile 'com.squareup.picasso:picasso:2.5.2'

    compile 'com.github.bumptech.glide:glide:3.7.0'
    compile 'com.github.chrisbanes:PhotoView:1.3.0'
    compile 'com.github.barteksc:android-pdf-viewer:2.+'
    compile 'com.github.PhilJay:MPAndroidChart:v3.+'
    compile 'com.crystal:crystalrangeseekbar:1.1.1'
    compile 'me.dm7.barcodescanner:zxing:1.9.1'

- à la toute fin du fichier, ajoutez cette ligne :

    apply plugin: 'realm-android'


Il ne reste plus qu'à synchroniser votre projet en cliquant sur le bouton 'Sync Now' qui est apparu en haut à droite.

## Configuration

Une fois le SDK installé, vous aurez accès à la classe com.cbien.sdk.CBien.

Il vous suffira donc simplement d'utiliser la méthode CBien.start(…); pour lancer le SDK CBien.

La méthode 'start' doit être appelée en passant en paramètres l'activité courante et une instance de CBien.Args.

Exemple : CBien.start(myActivity, new CBien.Args(myClientId, myClientSecret));

Le constructeur de CBien.Args nécessite deux paramètres obligatoires, un clientId et un clientSecret.
Un Args possède également plusieurs attributs qui peuvent être modifiés via des setters une fois l'objet construit.

#### Paramètres nécessaires pour la création de CBien.Args :
    - clientId : votre clientId permettant la connexion à l'api CBien.
    - clientSecret : votre clientSecret permettant la connexion à l'api CBien.

#### Champs modifiables via les setters de CBien.Args :

    - inProduction : permet d'utiliser l'api en prod ou celle destiné aux partenaires.
    - uniqueIdentifier : l'identifiant sociétaire utilisant votre application.
    - refreshToken : permet la vérification de l’éligibilité du sociétaire à l’offre. Si aucun refresh token n’est renseigné, l'utilisateur est considéré comme éligible. Vous avez accès à la méthode "needToken(Activity currentActivity)", qui permet de savoir si vous devez renseignez un nouveau refresh_token.

    - font : Police de caractères utilisée par l'application ('roboto', 'helvetica', 'lato')
    - asIcon : permet de choisir si les images sont affichées en arrière-plan ou en tant qu'icônes

    - primaryColor et secondaryColor : couleurs du thème utilisé par le SDK.
    - stuffColor, vehicleColor et domainColor : couleurs respectivement utilisées par le SDK pour les listes "Objets", "Véhicules" et "Résidences" du menu principal
    - headerBackgroundColor : couleur du de l'arrière-plan du bandeau du menu principal
    - headerTextIconColor : couleur des titres des onglets et du titre et des icônes du menu principal
    - headerIndicatorColor : couleur de l'indicateur utilisé par les onglets du menu principal

	/!\ Les couleurs sont à déclarer en héxadécimal, exemple : '#8822EE'
