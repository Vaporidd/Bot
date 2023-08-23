const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = Discord;

const client = new Client({
  intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
  ],
});

// Collection to hold commands
client.commands = new Discord.Collection();

// Function to read commands recursively
const loadCommands = (dir) => {
  console.log(`Reading directory: ${dir}`);
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    console.log(`Checking file: ${filePath}`);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      loadCommands(filePath);
    } else if (file.endsWith('.js')) {
      console.log(`Attempting to require: ${filePath}`);
      const command = require(`./${filePath}`);
      client.commands.set(command.name, command);
    }
  }
};

// Load commands
loadCommands('./commands');

// Function to set bot's activity (presence)
// Function to set bot's activity (presence)
const setBotActivity = () => {
  client.user.setActivity('Playing Hierarchy Woofer', { type: 'PLAYING' });
};


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set the bot's activity
  client.user.setActivity('Playing Hierarchy Woofer', { type: 'PLAYING' });

  // Register commands
  const guildId = '1110583935282462762';
  const commands = client.commands.map(({ name, description }) => ({ name, description }));
  client.application.commands.set(commands, guildId);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
});

// Replace with your actual token
client.login('MTE0MjkwMDQyNDUwNTAzMjcxNA.GN4QPm.gW00z7P8GwwZfjlezaLrAnmyXayHrS26Anw_j0');