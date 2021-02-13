const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { url } = await fetch('https://random.dog/woof.json').then(res => res.json());
    const attachment = new MessageAttachment(url);
    message.channel.send(attachment);
}

module.exports.config = {
    aliases: ['randomdog', 'doggo'],
    category: 'animal',
}

module.exports.info = {
    name: 'dog',
    description: 'Get a random doggo picture!',
    usage: 'dog'
}