const { get } = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const { data } = get('https://nekobot.xyz/api/image', {
        params: {
            type: 'neko'
        }
    });

    const attachment = new MessageAttachment(data.message);
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'anime',
    cooldown: 3
}

module.exports.info = {
    name: 'neko',
    description: 'Get a random neko picture!',
    usage: 'neko'
}