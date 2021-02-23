const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { file } = await fetch('https://aws.random.cat/meow').then(res => res.json());
    const attachment = new MessageAttachment(file);
    message.channel.send(attachment);
}

module.exports.config = {
    aliases: ['randomcat', 'kitty'],
    category: 'animal',
}

module.exports.info = {
    name: 'cat',
    description: 'Get a random kitty picture!',
    usage: 'cat'
}