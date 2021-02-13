const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { data } = await get('http://api.nekos.fun:8080/api/laugh');

    const embed = new MessageEmbed()
    .setTitle(`**${message.author.username} is laughing**`)
    .setImage(data.image)
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

    message.channel.send(embed);
}

module.exports.config = {
    category: 'reaction',
    cooldown: 3
}

module.exports.info = {
    name: 'laugh',
    description: 'AHAAHAHAHAAAHAHA',
    usage: 'laugh'
}