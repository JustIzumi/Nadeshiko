const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const region = {
        'brazil': 'Brazil',
        'eu-central': 'Central Europe',
        'europe': 'Europe',
        'singapore': 'Singapore',
        'us-central': 'U.S. Central',
        'sydney': 'Sydney',
        'us-east': 'U.S. East',
        'us-south': 'U.S. South',
        'us-west': 'U.S. West',
        'eu-west': 'Western Europe',
        'vip-us-east': 'U.S. East',
        'london': 'London',
        'amsterdam': 'Amsterdam',
        'hongkong': 'Hong Kong',
        'russia': 'Russia',
        'southafrica': 'South Africa'
    };

    if (message.guild.available !== true) return;
   
    const embed = new MessageEmbed()
    .setTitle(`**${message.guild.name}**`)
    .setDescription('**Server ID:** ' + `**\`${message.guild.id}\`**\n\u200b`)
    .addField('**Server Owner**', `**\`${message.guild.owner.user.tag}\`**`, true)
    .addField('**Owner ID**', `**\`${message.guild.ownerID}\`**`, true)
    .addField('**Creation Date**', `**\`${moment.utc(message.guild.createdAt).format('MM/DD/YYYY h:mm A')}\`**`)
    .addField('**Server Region**', `**\`${region[message.guild.region]}\`**`)
    .addField('**Member Count**', `**\`${message.guild.memberCount}\`**`)
    .addField('**Boost Count**', `**\`${message.guild.premiumSubscriptionCount || 'This server doesn\'t have boosts :('}\`**`, true)
    .addField('**Boost Level**', `**\`${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : 'No boost level'}\`**`, true)
    .addField('**Channel Count**', `**\`${message.guild.channels.cache.size}\`**`)
    .addField('**Role Count**', `**\`${message.guild.roles.cache.size}\`**`)
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setThumbnail(message.guild.iconURL({ dynamic: true }))

    message.channel.send(embed);
}

module.exports.config = {
    aliases: ['serverinfo', 'server-info'],
    category: 'utility'
}

module.exports.info = {
    name: 'server',
    description: 'Get some information on the current server!',
    usage: 'server'
}