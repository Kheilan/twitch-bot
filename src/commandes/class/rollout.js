const CommandBase = require('./cmdbase'); 

class CmdRollout extends CommandBase
{
    constructor()
    {
        const commande = "!rollout";
        const description = "Basic exemple for creating a new command.";
        const delay = 5000;

        super(commande, description, delay);
    }

    Execute(client, channel, tags, message, self)
    {
        if (!this._CanExecute())
            return;

        client.say(channel, `Eh tu veux quoi ${tags['display-name']}. [${this.GetDelay()}⏱]`);
        super.Execute(tags['display-name'], tags['user-id'], channel, tags['room-id']);
    }
}

module.exports = new CmdRollout();