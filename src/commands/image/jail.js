const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;

    const base = await Canvas.loadImage(user.avatarURL({ format: "png", size: 512 }));
    const img = await Canvas.loadImage("https://i.imgur.com/lbhwqYK.png");
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'jail.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'jail',
    description: 'Put someone behind bars!',
    usage: 'jail | jail <@user>'
}