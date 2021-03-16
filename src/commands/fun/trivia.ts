import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { decode } from 'html-entities';
import _ from 'lodash';

export const run = async (client, message, args, utils) => {

    const { data:res } = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');

    const question = decode(String(res.results[0].question));
    const answer = decode(String(res.results[0].correct_answer)).replace(/\" /g, '').trim();
    const difficulty = res.results[0].difficulty;

    const time = {
        easy: 20,
        medium: 15,
        hard: 10
    };

    const embed = new MessageEmbed()
    .setTitle(`**${_.capitalize(question)}**`)
    .setDescription(`**You have \`${time[difficulty.toLowerCase()]}\` second(s) to type reply with the correct answer!**`)
    .addField('**Category**', `**\`${_.capitalize(res.results[0].category)}\`**`, true)
    .addField('**Difficulty**', `**\`${_.capitalize(difficulty)}\`**`, true)
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()

    const answerArr = [answer];
    res.results[0].incorrect_answers.map((e) => answerArr.push(e));
    
    for (let i = answerArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerArr[i], answerArr[j]] = [answerArr[j], answerArr[i]];
    }

    embed.addField('**Possible Answers**', `**${answerArr.map(e => `\`${decode(e)}\``).join(', ')}**`)

    message.channel.send(embed).then((msg) => {
        const filter = (m) =>  m.content.trim().toLowerCase().includes(answer.toLowerCase()) &&
            m.author.id === message.author.id;

        message.channel.awaitMessages(filter, { max: 1, time: time[difficulty.toLowerCase()] * 1000, errors: ['time'] })
            .then(() => {
                const answerEmbed = new MessageEmbed()
                .setTitle('**You got the correct answer!**')
                .addField('**Question was...**', `**\`${question}\`**`)
                .addField('**The answer was...**', `**\`${answer}\`**`)
                .setColor('RANDOM')
                .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()

                return msg.edit(answerEmbed);
            })
            .catch(() => {
                const endEmbed = new MessageEmbed()
                .setTitle('**You ran out of time!**')
                .addField('**The question was...**', `**\`${question}\`**`)
                .addField('**The answer was...**', `**\`${answer}\`**`)
                .setColor('RANDOM')
                .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()

                return msg.edit(endEmbed);
            });
    });
}

export const config = {
    aliases: ['quiz'],
    category: 'fun',
    cooldown: 5
}

export const info = {
    name: 'trivia',
    description: 'Get a random trivia question!',
    usage: 'trivia'
}