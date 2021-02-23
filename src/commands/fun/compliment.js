const { get } = require('axios');

module.exports.run = async (client, message, args, utils) => {
    const user = message.mentions.users.first();

    if (!user) return message.channel.send(`**Who do you want to compliment? \`${utils.prefix}compliment <@user>\`**`);
    if (user.id == message.author.id) return message.channel.send('**Try choosing someone else!**');

    const { data } = await get('https://complimentr.com/api');
    message.channel.send(`**${user.tag}\n\`${data.compliment}\`**`);
}

module.exports.config = {
    category: 'fun'
}

module.exports.info = {
    name: 'compliment',
    description: 'Compliment someone!',
    usage: 'compliment <@user>'
}