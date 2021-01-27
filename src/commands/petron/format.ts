//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
const axios = require('axios');

//* Module imports
const { MessageAttachment } = require('discord.js');

//* --------------------- Format --------------------- *\\

module.exports = {
  commands: ['format'],
  expectedArgs: '<theme> \n <code>',
  permissionError: 'You need admin permissions to run this command.',
  minArgs: 2,
  maxArgs: null,
  callback: (message: any, _args: Array<string>, text: string) => {
    const split = text.split('```');
    const theme = split[0].replace(/\n/g, '');
    const code = split[1].substring(split[1].indexOf('\n'), split[1].length);
    const data = { theme, code, token: process.env.PETRON_TOKEN };

    axios
      .get('http://www.infotition.de:3000/api/petron/format', { data })
      .then((response: any) => {
        const attachment = new MessageAttachment(response.data.msg);
        message.reply(attachment).then(() => message.delete());
      })
      .catch((error: any) => {
        console.log(error.response.data.errors);
      });
  },
  permissions: 'ADMINISTRATOR',
};
