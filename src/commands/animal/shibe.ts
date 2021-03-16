import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('http://shibe.online/api/shibes');

    const attachment = new MessageAttachment(data[0]);
    message.channel.send(attachment);
}

export const config = {
    aliases: ['randomshibe', 'shibainu'],
    category: 'animal',
}

export const info = {
    name: 'shibe',
    description: 'Get a random shiba inu picture!',
    usage: 'shibe'
}