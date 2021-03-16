const fetch = require('node-fetch');
const isUrl = require('../../functions/isUrl.js');

module.exports.run = async (client, message, args, utils) => {
    if (!isUrl(args[1])) return message.channel.send(`**The URL you supplied was invalid! Please try again!**`);

    const data = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURI(args[1])}`)
    .then(res => res.text());

    message.channel.send(`**\`${data}\`**`);
}

module.exports.config = {
    category: 'utility',
    cooldown: 5,
    args: true,
    argsError: 'Please provide me an URL to shorten!'
}

module.exports.info = {
    name: 'shorten',
    description: 'Shorten an URL!',
    usage: 'short <url>'
}