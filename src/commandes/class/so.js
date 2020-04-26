const https = require('https');
const CommandBase = require('./cmdbase'); 
const config = require('../../config/config.json');

const SOOPTIONS = {
    hostname: 'api.twitch.tv',
    path: '/helix/users/',
    method: 'GET',
    headers: {
        "Accept": "application/vnd.twitchtv.v3+json",
        'Client-ID': config.twitchCredentials.identity.clientId,
        'Authorization': 'OAuth ' + config.twitchCredentials.identity.oauthToken
    }
};

class CmdShoutOut extends CommandBase
{
    constructor()
    {
        const commande = "!so";
        const description = "Create a shout out message to the user with the URL of the Twitch channel";
        const delay = 2000;

        super(commande, description, 0, delay);
    }

    execute(client, channel, tags, message, self)
    {
        if (!this._canExecute(tags.badges)) {
            return;
        }

        var user = this._getUserFromMessage(message);

        if('' == user){
            client.say(channel, `Donne-moi le nom de la chaîne idiot ! [${this.getDelay()}ms⏱]`);
            return;
        }

        let options = this._createRequestOption(user);
        const req = https.request(options, res => {
            let resData = '';
        
            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', d => {
                resData += d;
                let resDataObj = JSON.parse(resData);
                if (res.statusCode == 200) {
                    if(0 == resDataObj.data.length){
                        client.say(channel, `Désolé, mais je ne connais pas cette chaîne :/ [${this.getDelay()}ms⏱]`);
                    } else {
                        client.say(channel, 
                            `orionBEER orionCOEUR Tu ne connais pas ?! Va lâcher ton follow ici : https://twitch.tv/${user} orionCOEUR orionBEER [${this.getDelay()}ms⏱]`);
                    }
                }
            });
        });

        req.on('error', error => {
            console.error(error);
        });
        req.end();
        super.execute(tags['display-name'], tags['user-id'], channel, tags['room-id']);
    }

    _createRequestOption(user)
    {
        let options = Object.assign(Object.prototype, SOOPTIONS);
        options.path = options.path + '?login=' + user;
        return options;
    }

    // Remove the `!so`
    _getUserFromMessage(message)
    {
        const regex = /^(?:!so |!so)/g;

        return message.replace(regex, '');
    }
}

module.exports = new CmdShoutOut();