const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { data } = await get(`http://api.urbandictionary.com/v0/define?term=${utils.arguments}`);

    if (data.list.length !== 0) {
        const embed = new MessageEmbed()
            .setTitle(`Definition for \`${data.list[0].word}\``)
            .setURL(data.list[0].permalink)
            .addField(`**Definition:**`, `**\`${data.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')}\`**`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        if (data.list[0].example) {
            embed.addField(`**Example:**`, `**\`${data.list[0].example.replace(/\[/g, '').replace(/\]/g, '')}\`**`);
            return message.channel.send(embed);
        }

        message.channel.send(embed);
    } else {
        return message.channel.send(`**No definition was found for \`${utils.arguments}\`**`);
    }
}

module.exports.config = {
    category: 'utility',
    aliases: ['urbandictionary', 'ud'],
    args: true,
    argsError: 'What word to search for?',
}

module.exports.info = {
    name: 'urban',
    description: 'Search for a word in the Urban Dictionary!',
    usage: 'urban <word>'
}