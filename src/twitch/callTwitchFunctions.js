const config = require('../config/config.json');

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