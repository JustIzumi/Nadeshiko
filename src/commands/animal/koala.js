const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { link } = await fetch('https://some-random-api.ml/img/koala').then(res => res.json());
    const attachment = new MessageAttachment(link);
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'animal',
}

module.exports.info = {
    name: 'koala',
    description: 'Get a cute koala picture!',
    usage: 'koala'
}