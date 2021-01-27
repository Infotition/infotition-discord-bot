//* ---------------------- Server --------------------- *\\

module.exports = {
  commands: 'servers',
  minArgs: 0,
  maxArgs: 0,
  callback: (
    message: any,
    _args: Array<string>,
    _text: string,
    client: any
  ) => {
    client.guilds.cache.forEach((guild: any) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members!`
      );
    });
  },
};
