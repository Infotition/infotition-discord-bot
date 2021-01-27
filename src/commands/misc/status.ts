//* ---------------------- Status --------------------- *\\

module.exports = {
  commands: 'status',
  expectedArgs: '[text]',
  permissionError: 'You need admin permissions to run this command.',
  minArgs: 1,
  callback: (
    _message: any,
    _args: Array<string>,
    text: string,
    client: any
  ) => {
    client.user.setPresence({
      activity: {
        name: text,
        type: 0,
      },
    });
  },
  permissions: 'ADMINISTRATOR',
};
