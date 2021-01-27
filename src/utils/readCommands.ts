//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
const fs = require('fs');
const path = require('path');

//* ------------------ CONFIGURATION ------------------ *\\
const baseFile = 'commandBase.js';
const commandBase = require(`../commands/${baseFile}`);

//* ------------------- ReadCommands ------------------ *\\

const readCommands = (dir: string, client: any) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  files.forEach((file: string) => {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file), client);
    } else if (file !== baseFile) {
      const option = require(path.join(__dirname, dir, file));
      commandBase(client, option);
    }
  });
};

module.exports = readCommands;
