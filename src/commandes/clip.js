const twitchAPI = require('../twitch/callTwitchFunctions.js');

module.exports.execute = function (client, target) 
{
  var chaineId = "82360225";
      twitchAPI.postCreateClip(client, chaineId, resultat => {
        traitementOnCallback(client, target, chaineId, resultat);
      });
};


function traitementOnCallback(client, target, userId, resultat)
{
  console.log("TODO : Message à afficher dans le chat");
};