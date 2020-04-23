const tmi = require('tmi.js');

const config = require('./config/config.json');

// Commandes
const dice = require('./commandes/dice.js');
const so = require('./commandes/so.js');
const rollout = require('./commandes/class/rollout');

// Create a client with our options
const client = new tmi.client(config.tmiCredentials);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {

  // Ignore messages du bot et les commandes ne commençant pas par '!'
  if (self || msg.charAt(0) != '!') { return; } 

  // On split le message en fonction des espaces, 
  // le premier étant le nom de la commande à exécuter
  const commande = msg.split(" ");

  // On recherche si la commande fournie est dans la liste des commandes existantes
  // TODO Ajouter commande help (générale + spécifique par commande ?)
  switch(commande[0]) {
      case "!dice":
        console.log(`-- Commande ${commande} exécutée`);
        dice.execute(client, target);
        break;
      
      case "!so":
        console.log(`-- Commande ${commande} exécutée`);
        so.execute(client, target, commande[1]);
        break;
      case rollout.GetCommand():
        rollout.Execute(client, target, context, msg, self);
        break;
      default:
        console.log(`-- Commande ${commande} inconnue`);
        break;
  }

}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`-- Connected to ${addr}:${port}`);
}

