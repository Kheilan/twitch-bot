const twitchAPI = require('../twitch/callTwitchFunctions.js');

module.exports.execute = function (client, target, chaine) { 
    if(null != chaine){
      twitchAPI.getUserInfo(client, chaine, resultat => {
        traitementOnCallback(client, target, chaine, resultat);
      });
    } else {
      client.say(target, "Donne-moi le nom de la chaîne idiot !");
    }
};


function traitementOnCallback(client, target, user, resultat){
  // On regarde si l'appel Twitch a renvoyé des informations sur la chaine
  if(0 == resultat.data.length){
    client.say(target, "Désolé, mais je ne connais pas cette chaîne :/");
  } else {
    client.say(target, `imGlitch Si tu ne connais pas, lâche ton follow ici : https://twitch.tv/${user}`);
  }
};