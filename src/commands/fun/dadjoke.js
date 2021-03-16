const { get } = require('axios');

module.exports.run = async (client, message, args, utils) => {

    const { data } = await get('https://icanhazdadjoke.com/slack');
    message.channel.send(`**\`${data.attachments[0].text}\`**`);
}

module.exports.config = {
    aliases: ['dadjk', 'djk'],
    category: 'fun'
}

module.exports.info = {
    name: 'dadjoke',
    description: 'Get a random dad joke!',
    usage: 'dadjoke'
}