const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'woofer',
  description: 'Displays information about The Hierarchy Woofer.',
  async execute(interaction) {
    const roleID = '1116485628390015156';
    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (!member || !member.roles.cache.some(role => role.id === roleID)) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle('The Hierarchy Woofer')
      .setColor('#00FF00') // Sets the color to green
      .setImage('https://cdn.discordapp.com/attachments/1099845430558347328/1143982395368947712/image.png') // Adds the image at the bottom
      .addFields(
        { name: '**Features**', value: '• Temp Woof\n• Perm Woof\n• Serial Checker\n• Cleaner\n• Windows Client\n• Video Tutorial\n• In-Client AI Chat Bot for 24/7 Support\n• Private Chat\n\u200B', inline: false },
        { name: '**Supported OS**', value: '• Windows 10/11\n\u200B', inline: false },
        { name: '**Supported Games**', value: '[+] Valorant\n[+] Fortnite\n[+] Apex\n[+] Modern Warfare\n[+] CSGO\n[+] GTA 5\n[+] Rocket League\n\u200B', inline: false },
        { name: '**Prices**', value: '• 25$ for one Perm Woof\n• 25$ for 1 month of Temp Woof\n• 75$ for Perm Woof Lifetime\n• 55$ for Temp Woof Lifetime\n\u200B', inline: false },
        { name: '**Contact**', value: 'If you have any questions or want to buy, open a [ticket](https://discord.com/channels/1110583935282462762/1119088986212810823).\n\u200B', inline: false }
      )
      .setFooter({ text: 'If our Woofer fails to work on your computer, we will give you a full 100% refund after investigations.' });

    await interaction.reply({ embeds: [embed] });
  },
};
