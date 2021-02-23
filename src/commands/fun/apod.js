const { get } = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const { data } = await get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);

    const attachment = new MessageAttachment(data.hdurl)
    message.channel.send(`**\`${data.explanation}\`**`, attachment);
}

module.exports.config = {
    category: 'fun'
}

module.exports.info = {
    name: 'apod',
    ddescription: 'Astronomy Picture of The Day',
    usage: 'apod'
}