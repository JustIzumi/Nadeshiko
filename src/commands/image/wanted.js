const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(1280, 1742);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;

    const base = await Canvas.loadImage('https://i.imgur.com/7tsazy0.png');
    const img = await Canvas.loadImage(user.avatarURL({ format: 'png', size: 1024 }));
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, canvas.width / 2 - 768 / 2, canvas.height / 2 - 768 / 2.3, 768, 768);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'wanted.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'wanted',
    description: 'Make a wanted poster of someone!',
    usage: 'wanted | wanted <@user>'
}