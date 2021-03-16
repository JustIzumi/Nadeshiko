import axios from 'axios';
import { MessageEmbed } from 'discord.js';

export const run = async (client, message, args, utils) => {

    const { data } = await axios.get('http://api.nekos.fun:8080/api/kiss');

    const user = message.mentions.users.first();
    if (!user) return message.channel.send('**Who do you want to kiss? `kiss <@user>`**');

    const embed = new MessageEmbed()
    .setTitle(`**${message.author.username} kissed ${user.username}**`)
    .setDescription('**Aww~**')
    .setImage(data.image)
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

    message.channel.send(embed);
}

export const config = {
    category: 'reaction',
    cooldown: 3
}

export const info = {
    name: 'kiss',
    description: 'Kiss someone!',
    usage: 'kiss <@user>'
}