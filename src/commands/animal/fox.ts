import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('https://randomfox.ca/floof/');
    const attachment = new MessageAttachment(data.image);
    message.channel.send(attachment);
}

export const config = {
    aliases: ['randomfox'],
    category: 'animal',
}

export const info = {
    name: 'fox',
    description: 'Get a random fox picture!',
    usage: 'fox'
}