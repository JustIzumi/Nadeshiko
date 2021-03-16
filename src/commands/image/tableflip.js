const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(480, 252);
    const ctx = canvas.getContext('2d');

    const base = await Canvas.loadImage('https://i.imgur.com/bKqCUqi.jpg');
    const img = await Canvas.loadImage(message.author.avatarURL({ format: 'png', size: 1024 }));
    const img2 = await Canvas.loadImage(message.author.avatarURL({ format: 'png', size: 1024 }));
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 73, 30, 45, 45);
    ctx.drawImage(img2, 290, 40, 45, 45);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'tableflip.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'tableflip',
    description: 'Angry? Give that table what it deserves!',
    usage: 'tableflip'
}