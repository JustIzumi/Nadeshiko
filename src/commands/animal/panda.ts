import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://some-random-api.ml/img/panda');
    const attachment = new MessageAttachment(data.link);
    message.channel.send(attachment);
}

export const config = {
    aliases: ['randompanda'],
    category: 'animal',
}

export const info = {
    name: 'panda',
    description: 'Get a random kitty picture!',
    usage: 'panda'
}