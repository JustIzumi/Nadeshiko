import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://some-random-api.ml/img/birb');
    const attachment = new MessageAttachment(data.link);
    message.channel.send(attachment);
}

export const config = {
    category: 'animal',
}

export const info = {
    name: 'bird',
    description: 'Get a random bird picture!',
    usage: 'bird'
}