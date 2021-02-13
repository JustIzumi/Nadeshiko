const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;

    const base = await Canvas.loadImage(user.avatarURL({ format: "png", size: 512 }));
    const img = await Canvas.loadImage("https://i.imgur.com/SH0Bsc4.png");
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    const attachment = new MessageAttachment(canvas.toBuffer(), 'gay.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'gay',
    description: 'Make someone gay!',
    usage: 'gay | gay <@user>'
}