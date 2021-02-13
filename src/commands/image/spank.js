const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(992, 661);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first();
    if (!user) return message.channel.send(`**Who do you want to spank? \`${utils.prefix}spank <@user>\`**`);

    const base = await Canvas.loadImage('https://i.imgur.com/8HzV0YL.jpg');
    const img = await Canvas.loadImage(message.author.avatarURL({ format: 'png', size: 1024 }));
    const img2 = await Canvas.loadImage(user.avatarURL({ format: 'png', size: 1024 }));
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 370, 40, 220, 220);
    ctx.drawImage(img2, 740, 370, 190, 190);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'spank.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3
}

module.exports.info = {
    name: 'spank',
    description: 'Spank someone!',
    usage: 'spank <@user>'
}