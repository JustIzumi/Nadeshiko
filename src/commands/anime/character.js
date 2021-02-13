const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const { data } = await get('https://api.jikan.moe/v3/search/character/', {
        params: {
            q: utils.arguments,
            page: 1,
            limit: 1
        }
    });

    if (!data.results.length) return message.channel.send('**Didn\'t find anything! Try searching for something else!**');

    const res = data.results[0];

    const embed = new MessageEmbed()
    .setTitle(`**\`${data.results[0].name}\`**`)
    .setDescription(`**MAL id: \`${data.results[0].mal_id}\`**`)
    .setURL(data.results[0].url)
    .addFields(
        { name: '» Anime', value: `**\`${res.anime.length > 0 ? res.anime.map(anime => anime.name)[0] : 'None'}\`**`, inline: true },
        { name: '» Manga', value: `**\`${res.manga.length > 0 ? res.manga.map(manga => manga.name)[0] : 'None'}\`**`, inline: true },
        { name: '» Alternative name', value: `**\`${res.alternative_names.length > 0 ? res.alternative_names[0] : 'None'}\`**`}
    )
    .setThumbnail(data.results[0].image_url)
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setColor('RANDOM')

    message.channel.send(embed);
}

module.exports.config = {
    category: 'anime',
    args: true,
    argsError: 'What to search for',
    cooldown: 5
}

module.exports.info = {
    name: 'character',
    description: 'Search for a character on MAL!',
    usage: 'character <character name>'
}