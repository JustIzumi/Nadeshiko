const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { link } = await fetch('https://some-random-api.ml/img/red_panda').then(res => res.json());
    const attachment = new MessageAttachment(link);
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'animal',
}

module.exports.info = {
    name: 'redpanda',
    description: 'Get a random red panda picture!',
    usage: 'redpanda'
}