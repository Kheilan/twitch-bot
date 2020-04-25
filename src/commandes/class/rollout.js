const CommandBase = require('./cmdbase'); 

class CmdRollout extends CommandBase
{
    constructor()
    {
        const commande = "!rollout";
        const description = "Basic exemple for creating a new command.";
        const delay = 10000;

        super(commande, description, 0, delay);
    }

    execute(client, channel, tags, message, self)
    {
        if (!this._canExecute(tags.badges)) {
            return;
        }
        let delayString = (this.getDelay() / 1000) + 's';

        client.say(channel, `Eh tu veux quoi ${tags['display-name']}. [${delayString}⏱]`);
        super.execute(tags['display-name'], tags['user-id'], channel, tags['room-id']);
    }
}

module.exports = new CmdRollout();