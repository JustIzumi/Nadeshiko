const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;

    const base = await Canvas.loadImage(user.avatarURL({ format: "png", size: 1024 }));
        const img = await Canvas.loadImage("https://i.imgur.com/TcNEBYs.png");
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 10, 800, 600, 300);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'brazzers.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'brazzers',
    description: 'Put the brazzers watermark on someones profile picture!',
    usage: 'brazzers | brazzers <@user>'
}