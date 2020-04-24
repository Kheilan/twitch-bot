const config = require('../config/config.json');

// Récupère les informations de l'utilisateur passé en paramètre
module.exports.getUserInfo = function (client, username, callback) { 
    client.api({
        url: "https://api.twitch.tv/helix/users/?login=" + username,
        method: "GET",
        headers: {
            "Accept": "application/vnd.twitchtv.v3+json",
            "Authorization": "OAuth " + config.twitchCredentials.identity.oauthToken,
            "Client-ID": config.twitchCredentials.identity.clientId
        }
    }, function(err, res, body) {
        console.log("getUserInfo pour username " + username + " : ", body);
        callback(body);
    });
};


// Attention : retourne uniquement le lien d'édition du clip, ne le crée pas en tant que tel
module.exports.postCreateClip = function (client, userId, callback) { 
    client.api({
        url: "https://api.twitch.tv/helix/clips?broadcaster_id=" + userId,
        method: "POST",
        headers: {
            "Accept": "application/vnd.twitchtv.v3+json",
            "Authorization": "Bearer " + config.twitchCredentials.identity.oauthToken,
            "Client-ID": config.twitchCredentials.identity.clientId
        }
    }, function(err, res, body) {
        console.log("postCreateClip pour broadcaster_id " + userId + " : ", body);
        callback(body);
    });
};