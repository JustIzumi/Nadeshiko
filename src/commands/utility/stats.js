const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    let seconds = (client.uptime / 1000);
    const days = Math.floor(seconds / 86400);
    seconds %= 86400
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);

    const embed = new MessageEmbed()
        .setAuthor(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .addField('**Ping:**', `**\`${client.ws.ping} ms\`**`, true)
        .addField('**Uptime:**', `**\`${days} day(s) ${hours} hour(s) ${minutes} minute(s)\`**`, true)
        .addField('**Command Count**', `**\`${client.commands.size}\`**`)
        .addField('**Users**', `**\`${client.users.cache.size}\`**`, true)
        .addField('**Guilds**', `**\`${client.guilds.cache.size}\`**`, true)
        .addField('**Memory Usage**', `**\`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} mb\`**`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setColor('RANDOM')
    message.channel.send(embed);
}

module.exports.config = {
    category: 'utility'
}

module.exports.info = {
    name: 'stats',
    description: 'Check out Sayuri\'s stats!',
    usage: 'stats'
}