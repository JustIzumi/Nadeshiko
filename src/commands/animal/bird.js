const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { link } = await fetch('https://some-random-api.ml/img/birb').then(res => res.json());
    const attachment = new MessageAttachment(link);
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'animal',
}

module.exports.info = {
    name: 'bird',
    description: 'Get a random bird picture!',
    usage: 'bird'
}