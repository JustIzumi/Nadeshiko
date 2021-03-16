import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://random.dog/woof.json');
    const attachment = new MessageAttachment(data.url);
    message.channel.send(attachment);
}

export const config = {
    aliases: ['randomdog', 'doggo'],
    category: 'animal',
}

export const info = {
    name: 'dog',
    description: 'Get a random doggo picture!',
    usage: 'dog'
}