const twitchAPI = require('../twitch/callTwitchFunctions.js');

module.exports.execute = function (client, target, chaine) { 
    if(null != chaine){
        const user = chaine;
        twitchAPI.getUserInfo(client, user, resultat => {
          console.log("Return : ", resultat);
          if(0 == resultat.data.length){
            client.say(target, "Désolé, mais je ne connais pas cette chaîne :/");
          } else {
            client.say(target, "Parce que c'est la famille, lâche ton follow ici : https://twitch.tv/" + user + " orionBEER");
          }
        })
      } else {
        client.say(target, "Donne-moi le nom de la chaîne idiot !");
      }
};