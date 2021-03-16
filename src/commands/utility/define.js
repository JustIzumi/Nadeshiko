const { get } = require('axios');
const { MessageEmbed } = require('discord.js');
const _ = require('lodash');

module.exports.run = async (client, message, args, utils) => {
    const { data } = await get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${utils.arguments}`, {
        params: {
            key: process.env.DICTIONARY_API_KEY
        }
    });

    if (!data[0].length) return message.channel.send('**Didn\'t find anything! Try searching for something else!**');

    const embed = new MessageEmbed()
    .setTitle(`**${_.capitalize(utils.arguments)}**`)
    .setDescription(`**\`${_.capitalize(data[0].shortdef[0])}\`**`)
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()

    message.channel.send(embed);
}

module.exports.config = {
    category: 'utility',
    args: true,
    argsError: 'What word to define?'
}

module.exports.info = {
    name: 'define',
    description: 'Define a word!',
    usage: 'define <word>'
}