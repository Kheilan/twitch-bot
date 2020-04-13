module.exports.execute = function (client, target) { 
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
};

// Function called when the "dice" command is issued
function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }