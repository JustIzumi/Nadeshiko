const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args, utils) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${utils.arguments}&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
        .then(res => res.json());

    const embed = new MessageEmbed()
    .setTitle(`**${res.name} [\`${res.sys.country}\`]**`)
    .setDescription(`**Weather: \`${res.weather[0].main}\` - \`${res.weather[0].description}\`**\n\u200b`)
    .addFields(
        { name: '**Temperature**', value: `**\`${res.main.temp}\`**`, inline: true},
        { name: '**Temperature Feels Like..**', value: `**\`${res.main.feels_like}\`**`, inline: true}
    )
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

    message.channel.send(embed);
}

module.exports.config = {
    category: 'utility',
    cooldown: 10,
    args: true,
    argsError: 'Give a city to retrieve weather data for!'
}

module.exports.info = {
    name: 'weather',
    description: 'Get weather data for a specific city!',
    usage: 'weather <city name>'
}