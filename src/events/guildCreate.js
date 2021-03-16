const { MessageEmbed } = require('discord.js');
const GuildSchema = require('../models/guild.js');

module.exports = async (client, guild) => {

    const schema = new GuildSchema({
        guildId: guild.id
    });

    schema.save();

    const embed = new MessageEmbed()
        .setTitle('Thank you for inviting Nadeshiko!')
        .setDescription(`**For a list of all available commands, please use \`${process.env.PREFIX}help\`**`)
        .addField('Get In Touch', '**[Server](https://discord.gg/h3cqnn2) | [Twitter](https://twitter.com/NadeDiscord)**')
        .setThumbnail(guild.iconURL())
        .setColor('RANDOM')
        .setFooter(guild.name, guild.iconURL())

    guild.owner.send(embed);
};