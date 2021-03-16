const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const { data: res } = await get('http://history.muffinlabs.com/date');

    const embed = new MessageEmbed()
        .setTitle(`**Today in History \`${res.date}\`**`)
        .setDescription('\u200b')
        .setURL(data.url)
        .addFields(
            { name: `**Event | Date: \`${res.data.Events[0].year}\`**`, value: `**\`${res.data.Events[0].text}\`**` },
            { name: `**Birth | Date: \`${res.data.Births[0].year}\`**`, value: `**\`${res.data.Births[0].text}\`**` },
            { name: `**Death | Date: \`${res.data.Deaths[0].year}\`**`, value: `**\`${res.data.Deaths[0].text}\`**` }
        )
        .setColor('RANDOM')
        .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.config = {
    aliases: ['tih'],
    category: 'fun'
}

module.exports.info = {
    name: 'today',
    description: 'Check out what happened Today in History™️',
    usage: 'today'
}