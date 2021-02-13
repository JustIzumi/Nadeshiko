const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { link } = await fetch('https://some-random-api.ml/img/panda').then(res => res.json());
    const attachment = new MessageAttachment(link);
    message.channel.send(attachment);
}

module.exports.config = {
    aliases: ['randompanda'],
    category: 'animal',
}

module.exports.info = {
    name: 'panda',
    description: 'Get a random kitty picture!',
    usage: 'panda'
}