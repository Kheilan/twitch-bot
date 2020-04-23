class CommandBase
{
    constructor(cmd, description, delay = 0)
    {
        this._cmd = cmd;
        this._description = description;
        this._delayInMs = delay;
    }

    /*
        Note: The method need to be override
        Every a command is executed, a log message is prompt.
    */
    Execute(usedByUsername, usedByUserId, roomName, roomId)
    {
        if (this.__proto__ === CommandBase.prototype)
            console.log("The execute function need to be override.");
        else
            console.log(this._LogCommand(usedByUsername, usedByUserId, roomName, roomId));
    }

    // Determine if function can be executed, verify the delay of msg posted and the previous one.
    _CanExecute()
    {
        let currentDate = new Date().getTime();

        if (this._lastUse === undefined || currentDate - this._lastUse >= this.GetDelay())
        {
            this._lastUse = currentDate;
            return true;
        }
        return false;
    }

    // Return a formated message for logs.
    _LogCommand(usedByUsername, usedByUserId, roomName, roomId)
    {
        let currentDate = new Date();
        const month = currentDate.getMonth() > 9 ? currentDate.getMonth() : '0' + currentDate.getMonth();
        const day = currentDate.getDay() > 9 ? currentDate.getDay() : '0' + currentDate.getDay();
        const hours = currentDate.getHours() > 9 ? currentDate.getHours() : '0' + currentDate.getHours();
        const minutes = currentDate.getMinutes() > 9 ? currentDate.getMinutes() : '0' + currentDate.getMinutes();
        const seconds = currentDate.getSeconds() > 9 ? currentDate.getSeconds() : '0' + currentDate.getSeconds();
        const dateFormat = '[' + day + '/' + month + ' - ' + hours + ':' + minutes + ':' + seconds +']';

        return `${dateFormat} Command "${this._cmd}" has been used by user ${usedByUsername}(${usedByUserId}) in room ${roomName}(${roomId}).`;
    }

    // Return a brief command description
    GetCommandDescription()
    {
        return this._description ? this._description : "No description.";
    }

    // #Getter / Setter
    // Delay before command can be used again.
    GetCommand()
    {
        return this._cmd;
    }

    GetDelay()
    {
        return this._delayInMs;
    }

    SetDelay(delayInMs)
    {
        this._delayInMs = delayInMs;
    }
}

module.exports = CommandBase;