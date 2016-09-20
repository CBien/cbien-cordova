# CBienKit SDK iOS

## Fonctionnalités

Le SDK permet différentes actions sur un compte CBien :

#### Connexion/inscription
- Se connecter à un compte existant
- Créer un compte

#### Ajout
- Ajouter un bien (via un code-barres, une suggestion ou manuellement)
- Ajouter un document (contrat, garantie ou autre)
- Ajouter une résidence
- Ajouter un véhicule (bientôt disponible)

#### Valeur estimée
- Connaitre la valeur estimée totale de ses biens avec une courbe d’évolution

#### Exporter
- Exporter son inventaire simplifié pour son assurance
- Exporter son inventaire complet
- Exporter la fiche d’un bien

#### Gérer
- Savoir le nombre de biens et la répartition selon des catégories
- Voir la liste de tous ses biens, de ses résidences et de ses documents
- Savoir le nombre de documents par type 

## Installation

#### Cocoapods

Le SDK CBien peut être installé via Cocoapods. Ouvrir le terminal et positionnez vous dans le dossier de votre projet Xcode. Si vous n’avez pas encore de fichier Podfile pour votre application, en créer un à l’aide de la
commande :

    pod init

Ouvrir le fichier Podfile créé et ajouter la ligne suivante :

    pod ‘CBienKit’

Sauvegarder le fichier puis executer la commande suivante :

    pod install

Cela créé un fichier .xcworkspace pour votre application. Ouvrir votre project avec ce fichier pour les futurs développement.

#### Manuellement

Télécharger le framework, puis, dans votre projet Xcode, se rendre dans : 
Paramètres -> Général -> et ajouter un « Embedded Binaries ». 
Sélectionner le fichier « CBienKit.framework » précédemment téléchargé.

Dans « Build settings », rechercher la clé « EMBEDDED_CONTENT_CONTAINS_SWIFT » et lui appliquer « YES ». 

## Initialiser le SDK pour votre application

Ajouter le SDK dans votre AppDelegate

    #import <CBienKit/CBienKit.h>

Ensuite, dans la méthode didFinishLaunchingWithOptions :

    [CBienCore configureWithClientId:@"<CLIENT_ID>" andSecret:@« <SECRET> » andUniqueIdentifier:@« <UNIQUE_ID> »];

Avec :

    • <CLIENT_ID> : le client_id que nous vous avons fourni.
    • <SECRET> : la clé secrète que nous vous avons fourni.
    • <UNIQUE_ID> : un identifiant unique de l’utilisateur utilisant l’application

Le SDK doit pouvoir ouvrir l’application CBien. Pour cela modifier le fichier « info.plist », ajouter la clé « LSApplicationQueriesSchemes » (array) et ajouter la chaine « cbien »

## Configurer le SDK

Vous pouvez intégrer votre logo ainsi que configurer différentes couleurs.

Pour cela, à la suite de la précédente ligne, ajouter :

    [CBienCore setLogo:[UIImage imageNamed:@« logo »]];
    [CBienCore setPrimaryColor:[UIColor blueColor]];
    [CBienCore setColorOnPrimaryColor::[UIColor whiteColor]];
    [CBienCore setSecondaryColor:[UIColor redColor]];
    [CBienCore setColorOnSecondaryColor:[UIColor whiteColor]];

## Utiliser le SDK

Une fois le SDK configuré, vous pouvez utiliser la méthode suivante sur un bouton par exemple :

    [CBienCore show:self];
