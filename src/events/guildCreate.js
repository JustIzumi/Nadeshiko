const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {

    const embed = new MessageEmbed()
        .setTitle('Thank you for inviting Nadeshiko!')
        .setDescription(`**For a list of all available commands, please use \`${client.defaultPrefix}help\`**`)
        .addField('Get In Touch', '**[Server](https://discord.gg/h3cqnn2) | [Twitter](https://twitter.com/NadeshiDiscord)**')
        .setThumbnail(guild.iconURL())
        .setColor('RANDOM')
        .setFooter(guild.name, guild.iconURL())

    guild.owner.send(embed);
};