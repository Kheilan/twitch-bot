# twitch-bot

Bot Twitch comportant quelques commandes d'assistance et des jeux pour le chat !

## Installation

* Faire un git clone de ce repository.
* Dans le dossier _/src_, ouvrir un terminal bash et exécuter la commande suivante : `npm install tmi.js`


## Configuration

* Créer une application avec le compte utilisé pour le bot sur : https://dev.twitch.tv/ 
    1. Dashboard > Enregistrer une application
    2. Renseigner un nom d'application
    3. Pour l'URL de redirection OAuth, mettre : http://localhost
    4. Catégorie : Chat Bot


* Dans le dossier _/src/config_, ouvrir le fichier _config.json_ et modifier les variables de la façon suivante :

| Variable        | Description |
| :-------------: |-------------|
| <BOT_USERNAME>  | Username du compte utilisé pour envoyer les messages dans le chat : peut être son compte personnel ou un compte dédié |
| <TMI_OAUTH_TOKEN>      | Token pour authentifier le compte sur les serveurs Twitch. Il faut utiliser le générateur suivant en étant connecté avec le compte défini dans la variable <BOT_USERNAME> : https://twitchapps.com/tmi/      |
| <CHANNEL_NAME> | Listes des chaînes Twitch où le bot souhaite être utilisé      |
| <TWITCH_CLIENT_ID>      | Identifiant client généré lors de la création de l'application sur le site Twitch Dev   |
| <TWITCH_OAUTH_TOKEN> | Générer un token en suivant la procédure suivante : https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-client-credentials-flow     |


## Démarrer le bot en local

Dans le dossier _/src_, ouvrir un terminal bash et exécuter la commande suivante : `node bot.js`
Se rendre sur la chaîne définie dans la variable <CHANNEL_NAME> renseignée auparavant, le bot est opérationnel !

## Démarrer le bot sur Glitch

_A venir_