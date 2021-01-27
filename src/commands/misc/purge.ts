//* ---------------------- Purge ---------------------- *\\

module.exports = {
  commands: ['purge', 'cc'],
  expectedArgs: '[num1]',
  permissionError: 'You need admin permissions to run this command.',
  minArgs: 0,
  maxArgs: 1,
  callback: (message: any) => {
    message.channel.messages.fetch().then((results: any) => {
      message.channel.bulkDelete(results);
    });
  },
  permissions: 'ADMINISTRATOR',
};
