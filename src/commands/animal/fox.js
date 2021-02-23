const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { image } = await fetch('https://randomfox.ca/floof/').then(res => res.json());
    const attachment = new MessageAttachment(image);
    message.channel.send(attachment);
}

module.exports.config = {
    aliases: ['randomfox', 'foxy'],
    category: 'animal',
}

module.exports.info = {
    name: 'fox',
    description: 'Get a random fox picture!',
    usage: 'fox'
}