const https = require('https');
const CommandBase = require('./cmdbase'); 
const config = require('../../config/config.json');

const MARKOPTIONS = {
    hostname: 'api.twitch.tv',
    path: '/helix/streams/markers',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Client-ID': config.twitchCredentials.identity.clientId,
        'Authorization': "Bearer " + 'YourKey' // To replace with a token that has: user:edit:broadcast
    }
};

class CmdMark extends CommandBase
{
    constructor()
    {
        const commande = "!mark";
        const description = "Crée un repère sur la vidéo.";
        const delay = 5000;

        super(commande, description, 3, delay);
    }

    execute(client, channel, tags, message, self)
    {
        if (!this._canExecute(tags.badges)) {
            client.say(channel, `Désolé tu n'as pas les autorisations nécessaires pour lancer cette commande orionCOEUR [${this.getDelay()}ms⏱]`);
            return;
        }

        let options = this._createRequestOption(tags, message);
        const req = https.request(options, res => {
            let data = '';
        
            console.log(`statusCode: ${res.statusCode}`);
            if (res.statusCode == 200) {
                client.say(channel, `Marqueur posé avec le nom: "${this._formatMessage(this._getMessage(message), tags)}" ! [${this.getDelay()}ms⏱]`);
            }

            res.on('data', d => {
                data += d;
            });
        });

        req.on('error', error => {
            console.error(error);
        });
        req.write(options.body);
        req.end();
        super.execute(tags['display-name'], tags['user-id'], channel, tags['room-id']);
    }

    _createRequestOption(tags, message)
    {
        let options = Object.assign(Object.prototype, MARKOPTIONS);

        options.body = this._createDataString(tags, message);
        options.headers['Content-Length'] = options.body.length;
        return options;
    }

    _createDataString(tags, message)
    {
        message = this._formatMessage(this._getMessage(message), tags);

        return JSON.stringify({
            user_id: tags['room-id'],
            description: message
        });
    }

    // Remove the `!mark`
    _getMessage(message)
    {
        const regex = /^(?:!mark |!mark)/g;

        return message.replace(regex, '');
    }

    _formatMessage(message, tags)
    {
        if (message === "") { // If message is empty, then show only time when the mark is created.
            const time = new Date();
            const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours() ;
            const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes() ;
            const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds() ;
            message = '[' + tags['display-name'] + `] ${hours}:${minutes}:${seconds}`;
        } else {
            message = '[' + tags['display-name'] + '] ' + message;
        }
        return message;
    }
}

module.exports = new CmdMark();