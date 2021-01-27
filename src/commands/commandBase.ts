export {};
//* ------------------- DEPENDENCIES ------------------ *\\

//* Module imports
const { prefix } = require('../../config/config.json');
const validatePermissions = require('../utils/validatePermissions');

//* ------------------- CommandBase ------------------- *\\

module.exports = (client: any, commandOptions: any) => {
  const {
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    requiredRoles = [],
    callback,
  } = commandOptions;

  let { commands, permissions = [] } = commandOptions;

  //* Ensure the command an aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands];
  }

  console.log(`registering command "${commands[0]}"`);

  //* Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  //* Listen for messages
  client.on('message', (message: any) => {
    const { member, content, guild } = message;

    commands.forEach((alias: string) => {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        //* Ensure the user has the required permissions
        permissions.forEach((permission: string) => {
          if (!member.hasPermission(permission)) {
            return message.reply(permissionError);
          }
          return null;
        });

        //* Ensure the user has the required roles
        requiredRoles.forEach((requiredRole: string) => {
          const role = guild.roles.cache.find(
            (foundRole: any) => foundRole.name === requiredRole
          );

          //* If role doesnt exists or member doesnt have it
          if (!role || member.roles.cache.has(role.id)) {
            return message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            );
          }
          return null;
        });

        //* Split on any number of spaces
        const args = content.split(/[ ]+/);

        //* Remove the command wgich is the first index
        args.shift();

        //* Ensure we have the correct number of arguments
        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          return message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          );
        }

        //* Handle the custom command code
        return callback(message, args, args.join(' '), client);
      }
      return null;
    });
  });
};
