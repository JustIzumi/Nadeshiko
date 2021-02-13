const roasts = require('../../../assets/json/roasts.json');

module.exports.run = async (client, message, args, utils) => {
    const user = message.mentions.users.first();

    if (!user) return message.channel.send(`**Who do you want to roast? \`${utils.prefix}roast <@user>\`**`);
    if (user.id == message.author.id) return message.channel.send('**Try choosing someone else!**');

    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    message.channel.send(`**${user.tag}\n\`${randomRoast}\`**`);
}

module.exports.config = {
    aliases: ['insult'],
    category: 'fun'
}

module.exports.info = {
    name: 'roast',
    description: 'Roast someone!',
    usage: 'roast | roast <@user>'
}