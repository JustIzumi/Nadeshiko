import axios from 'axios'
import { MessageEmbed } from 'discord.js';

export const run = async (client: any, message: any, args: any, utils: any) => {

    const { data } = await axios.get('http://api.nekos.fun:8080/api/cuddle');

    const user = message.mentions.users.first();
    if (!user) return message.channel.send('**Who do you want to cuddle with? `cuddle <@user>`**');

    const embed = new MessageEmbed()
    .setTitle(`**${message.author.username} is cuddling with ${user.username}**`)
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
    name: 'cuddle',
    description: 'Cuddle with someone!',
    usage: 'cuddle <@user>'
}