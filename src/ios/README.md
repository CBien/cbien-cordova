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

#### Manuellement

Télécharger le framework, puis, dans votre projet Xcode, se rendre dans : 
Paramètres -> Général -> et ajouter un « Embedded Binaries ». 
Sélectionner le fichier « CBienKit.framework » précédemment téléchargé.

Dans « Build settings », rechercher la clé « EMBEDDED_CONTENT_CONTAINS_SWIFT » et lui appliquer « YES ». 

## Initialiser le SDK pour votre application

Ajouter le SDK dans votre AppDelegate

    #import <CBienKit/CBienKit.h>

Ensuite, dans la méthode didFinishLaunchingWithOptions (ou au moment de la connexion de l'utilisateur pour avoir son unique_id) :

    [CBienCore configureWithClientId:@"<CLIENT_ID>" secret:@«<SECRET> » uniqueIdentifier:@«<UNIQUE_ID>» inProduction:<IN_PRODUCTION>];

Avec :

    • <CLIENT_ID> : le client_id que nous vous avons fourni.
    • <SECRET> : la clé secrète que nous vous avons fourni.
    • <UNIQUE_ID> : un identifiant unique de l’utilisateur utilisant l’application
    • <IN_PRODUCTION> : choix entre le serveur de recette (false) ou la production (true)

Le SDK doit pouvoir ouvrir l’application CBien. Pour cela modifier le fichier « info.plist », ajouter la clé « LSApplicationQueriesSchemes » (array) et ajouter la chaine « cbien »

## Configurer le SDK

Vous pouvez intégrer votre logo ainsi que configurer différentes couleurs.

Pour cela, à la suite de la précédente ligne, ajouter :

    [CBienCore setLogo:[UIImage imageNamed:@« logo »]];
    [CBienCore setPrimaryColor:[UIColor blueColor]];
    [CBienCore setColorOnPrimaryColor::[UIColor whiteColor]];
    [CBienCore setSecondaryColor:[UIColor redColor]];
    [CBienCore setColorOnSecondaryColor:[UIColor whiteColor]];
    
### Refresh token

Un refresh token peut être renseigné au SDK afin de vérifier l’éligibilité du sociétaire à l’offre. Si aucun refresh token n’est renseigné, l'utilisateur est considéré comme éligible. 
Vous avez accès à la méthode "[CBienCore refreshTokenNeeded]", qui permet de savoir si vous devez renseignez un nouveau refresh token. Le nouveau refresh token se défini via la méthode "[CBienCore setRefreshToken:@"your_refresh_token"];"

## Utiliser le SDK

Une fois le SDK configuré, vous pouvez utiliser la méthode suivante sur un bouton par exemple :

    [CBienCore show:self];
