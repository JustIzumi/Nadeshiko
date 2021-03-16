const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(713, 128);
    const ctx = canvas.getContext('2d');

    const img = await Canvas.loadImage('https://i.imgur.com/cRHmUeY.jpg');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#FB9B00';
    ctx.fillText(message.author.username, 60, 40);

    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(utils.arguments, 15, 85);

    const avatar = await Canvas.loadImage(message.author.avatarURL({ format: 'png', size: 1024 }));
    ctx.drawImage(avatar, 8, 11, 43, 43);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'phcmt.png');
    message.channel.send(attachment);
}

module.exports.config = {
    aliases: ['pornhubcomemnt', 'phcomment'],
    category: 'image',
    cooldown: 3,
    args: true,
    argsError: 'What do you want to comment?'
}

module.exports.info = {
    name: 'phcmt',
    description: 'Comment on PornHub!',
    usage: 'phcmt <text>'
}