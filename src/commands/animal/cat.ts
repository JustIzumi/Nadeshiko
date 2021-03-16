import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://aws.random.cat/meow');
    const attachment = new MessageAttachment(data.file);
    message.channel.send(attachment);
}

export const config = {
    aliases: ['randomcat', 'kitty'],
    category: 'animal',
}

export const info = {
    name: 'cat',
    description: 'Get a random kitty picture!',
    usage: 'cat'
}