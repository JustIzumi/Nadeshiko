const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const user = message.mentions.users.first() || message.author;

    const attachment = new MessageAttachment(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
    message.channel.send(`**\`${user.tag}\`**`, attachment);
}

module.exports.config = {
    category: 'utility',
    aliases: ['profilepic', 'pfp', 'a'],
}

module.exports.info = {
    name: 'avatar',
    description: 'Get someones profile picture!',
    usage: 'avatar | avatar <@user>'
}