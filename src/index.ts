export {};
//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
const Discord = require('discord.js');

//* Module imports
const readCommands = require('./utils/readCommands');

//* ------------------ CONFIGURATION ------------------ *\\

const client = new Discord.Client();

require('dotenv').config({
  path: '../config/index.env',
});

//* ------------------ DISCORD EVENTS ----------------- *\\
client.on('ready', () => {
  console.log('discord client is ready');
  readCommands('../commands', client);
});

//* -------------------- START BOT -------------------- *\\
client.login(process.env.DISCORD_TOKEN);
