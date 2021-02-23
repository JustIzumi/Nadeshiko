const { get } = require('axios');
const { MessageEmbed } = require('discord.js');
const { utc } = require('moment');

module.exports.run = async (client, message, args, utils) => {
    const { data } = await get('https://api.jikan.moe/v3/search/manga', {
        params: {
            q: utils.arguments,
            page: 1,
            limit: 1
        }
    });

    if (!data.results.length) return message.channel.send('**I couldn\'t find anything! Try searching for something else!**');

    const embed = new MessageEmbed()
    .setTitle(`**\`${data.results[0].title}\`**`)
    .setDescription(`**MAL id: \`${data.results[0].mal_id}\`**`)
    .setURL(data.results[0].url)
    .addFields(
        { name: '» Synopsis', value: `**\`${data.results[0].synopsis}\`**` },
        { name: '» Score', value: `**\`${data.results[0].score}\`**`, inline: true},
        { name: '» Members', value: `**\`${data.results[0].members}\`**`, inline: true},
        { name: '» Start date', value: `**\`${utc(data.results[0].start_date).format('MM/DD/YYYY h:mm A')}\`**`},
        { name: '» Chapters', value: `**\`${data.results[0].chapters}\`**`, inline: true},
        { name: '» Volumes', value: `**\`${data.results[0].volumes}\`**`, inline: true}
    )
    .setThumbnail(data.results[0].image_url)
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

    message.channel.send(embed);
}

module.exports.config = {
    category: 'anime',
    args: true,
    argsError: 'What to search for',
    cooldown: 5
}

module.exports.info = {
    name: 'manga',
    description: 'Search for a manga on MAL!',
    usage: 'manga <search query>'
}