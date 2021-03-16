const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const canvas = Canvas.createCanvas(596, 152);
    const ctx = canvas.getContext('2d');

    const img = await Canvas.loadImage('https://i.imgur.com/oM6aQwv.jpg');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	ctx.font = '18px sans-serif';
	ctx.fillStyle = '#ffffff';
    ctx.fillText(message.author.username, 70, 30);
    
    ctx.font = '12px sans-serif';
	ctx.fillStyle = '#6d767d';
    ctx.fillText(message.author.username, 90, 47.5);
    
    ctx.font = '25px verdana';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(utils.arguments, 15, 100);

    ctx.beginPath();
    ctx.arc(37, 33, 27, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(message.author.avatarURL({ format: 'png', size: 1024 }));
    ctx.drawImage(avatar, 10, 7.5, 58, 58);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'tweet.png');
    message.channel.send(attachment);
}

module.exports.config = {
    category: 'image',
    cooldown: 3,
    args: true,
    argsError: 'What text do you want to Tweet?'
}

module.exports.info = {
    name: 'tweet',
    description: 'Tweet something!',
    usage: 'tweet <text>'
}