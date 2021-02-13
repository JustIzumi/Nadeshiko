const fetch = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const image = await fetch('http://shibe.online/api/shibes').then(res => res.json());

    const attachment = new MessageAttachment(image[0]);
    message.channel.send(attachment);
}

module.exports.config = {
    aliases: ['randomshibe', 'shibainu'],
    category: 'animal',
}

module.exports.info = {
    name: 'shibe',
    description: 'Get a random shiba inu picture!',
    usage: 'shibe'
}