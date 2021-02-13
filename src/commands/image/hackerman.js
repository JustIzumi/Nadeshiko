const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const canvas = Canvas.createCanvas(700, 394);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;
    
    const base = await Canvas.loadImage("https://i.imgur.com/7IDUyKf.jpg");
    const img = await Canvas.loadImage(user.avatarURL({ format: "png", size: 1024 }));
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 300, 30, 128, 128);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'jail.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'hackerman',
    description: 'Make someone a hackerman!',
    usage: 'hackerman | hackerman <@user>'
}