# CBienKit SDK iOS

## Installation

#### Manuellement

1. Télécharger fichier **CBKit.framework**
2. Dans le projet XCode, aller dans les paramètres de la target de l'application 
3. Onglet **General** : ajouter un **Embedded Binaries**. 
4. Sélectionner le fichier **CBKit.framework** précédemment téléchargé.
5. Onglet **Build settings**, rechercher la clé **EMBEDDED_CONTENT_CONTAINS_SWIFT** et lui appliquer la valeur **YES**. 

## Initialiser le SDK pour votre application

Ajouter le SDK dans votre AppDelegate

    #import <CBKit/CBienKit.h>

Dans la méthode **didFinishLaunchingWithOptions** (ou au moment de la connexion de l'utilisateur pour avoir son unique_id) :

    [CBKitCore configureWithClientId:@"<CLIENT_ID>" secret:@"<SECRET>" uniqueIdentifier:@"<UNIQUE_ID>" production:<IN_PRODUCTION>];

Avec :

    • <CLIENT_ID> : le client ID que nous vous avons fourni.
    • <SECRET> : la clé secrète que nous vous avons fourni.
    • <UNIQUE_ID> : un identifiant unique de l’utilisateur utilisant l’application.
    • <IN_PRODUCTION> : choix entre le serveur de recette (*NO*) ou la production (*YES*)

Le SDK doit pouvoir ouvrir l’application CBien. Pour cela modifier le fichier « info.plist », ajouter la clé **LSApplicationQueriesSchemes** (array) et ajouter la chaine **cbien**

## Configurer le SDK

Vous pouvez configurer différentes couleurs, la police et le type d'icône (toutes les options sont optionnelles, une valeur est déjà définie pour chaque option). Pour cela, à la suite de la précédente ligne, ajouter :

    [CBKitCore setPrimaryColor:[UIColor blueColor]]; //default value blue (#489DCF)
    [CBKitCore setColorOnPrimaryColor::[UIColor greenColor]]; //default value white
    [CBKitCore setSecondaryColor:[UIColor greenColor]]; //default value green (#41C4AA)
    [CBKitCore setColorOnSecondaryColor:[UIColor whiteColor]]; //default value white
    
    [CBKitCore setStuffColor:[UIColor blueColor]]; //default value blue (#489DCF)
    [CBKitCore setVehicleColor:[UIColor blueColor]]; // default value blue (#44B1BD)
    [CBKitCore setDomainColor:[UIColor greenColor]]; //default value green (#41C4AA)
    
    [CBKitCore setHeaderBackgroundColor:[UIColor blueColor]]; //default value blue (#489DCF)
    [CBKitCore setHeaderTextColor:[UIColor whiteColor]]; //default value white
    [CBKitCore setHeaderSelectorColor:[UIColor whiteColor]]; //default value white

    [CBKitCore setButtonType:CBKitButtonTypeIcon]; // default value CBKitButtonTypeImage
    [CBKitCore setFont:CBKitFontHelvetica]; // default value system font

### CBKitFont : ```enum```
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| CBKitFontDefault | ```number``` | ```0``` | Return default system font (San Francisco iOS 10) |
| CBKitFontHelvetica | ```number``` | ```1``` | Return Helvetica font |
| CBKitFontLato | ```number``` | ```2``` | Return Lato font |
| CBKitFontRoboto | ```number``` | ```3``` | Return Roboto font |

### CBKitButtonType : ```enum```
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| CBKitButtonTypeImage | ```number``` | ```0``` | Return image |
| CBKitButtonTypeIcon | ```number``` | ```1``` | Return icon |
   
### Refresh token

Un refresh token peut être renseigné au SDK afin de vérifier l’éligibilité du sociétaire à l’offre. Si aucun refresh token n’est renseigné, l'utilisateur est considéré comme éligible.

Vous avez accès à la méthode **[CBKitCore refreshTokenNeeded]**, qui permet de savoir si vous devez renseignez un nouveau refresh token. Le nouveau refresh token se défini via la méthode **[CBKitCore setRefreshToken:@"your_refresh_token"];**

## Utiliser le SDK

Une fois le SDK configuré, utiliser la méthode suivante pour le lancer :

    [CBKitCore show:self];
