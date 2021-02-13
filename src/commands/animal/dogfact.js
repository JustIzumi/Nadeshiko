const fetch = require('axios');

module.exports.run = async (client, message, args, utils) => {

    const { fact } = await fetch('https://some-random-api.ml/facts/dog').then(res => res.json());
    message.channel.send(`**\`${fact}\`**`);
}

module.exports.config = {
    category: 'animal',
}

module.exports.info = {
    name: 'dogfact',
    description: 'Get an interesting dog fact!',
    usage: 'dogfact'
}