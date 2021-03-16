import axios from 'axios'

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://some-random-api.ml/facts/dog');
    message.channel.send(`**\`${data.fact}\`**`);
}

export const config = {
    category: 'animal',
}

export const info = {
    name: 'dogfact',
    description: 'Get an interesting dog fact!',
    usage: 'dogfact'
}