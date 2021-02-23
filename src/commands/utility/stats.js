const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    let seconds = (client.uptime / 1000);
    const days = Math.floor(seconds / 86400);
    seconds %= 86400
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);

    const guildCount = await client.shard.fetchClientValues('guilds.cache.size');
    const userCount = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)');

    const embed = new MessageEmbed()
        .setAuthor(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .addField('**Ping:**', `**\`${client.ws.ping} ms\`**`, true)
        .addField('**Uptime:**', `**\`${days} day(s) ${hours} hour(s) ${minutes} minute(s)\`**`, true)
        .addField('**Command Count**', `**\`${client.commands.size}\`**`)
        .addField('**Users**', `**\`${userCount.reduce((acc, userCount) => acc + userCount, 0)}\`**`, true)
        .addField('**Guilds**', `**\`${guildCount.reduce((acc, guildCount) => acc + guildCount, 0)}\`**`, true)
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
    description: 'Check out Nadeshiko\'s stats!',
    usage: 'stats'
}