import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://some-random-api.ml/img/koala');
    const attachment = new MessageAttachment(data.link);
    message.channel.send(attachment);
}

export const config = {
    category: 'animal',
}

export const info = {
    name: 'koala',
    description: 'Get a cute koala picture!',
    usage: 'koala'
}