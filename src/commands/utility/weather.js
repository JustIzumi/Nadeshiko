const { MessageEmbed } = require('discord.js');
const { get } = require('axios');

module.exports.run = async (client, message, args, utils) => {
    const { data: res } = await get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: utils.arguments,
            appid: process.env.OPENWEATHERMAP_API_KEY
        }
    }).catch(() => {
        return message.channel.send('**I couldn\'t find any cities that go by that name! Try again!**');
    });

    const embed = new MessageEmbed()
    .setTitle(`**${res.name} [\`${res.sys.country}\`]**`)
    .setDescription(`**Weather: \`${res.weather[0].main}\` - \`${res.weather[0].description}\`**\n\u200b`)
    .addFields(
        { name: '**Temperature**', value: `**\`${res.main.temp} °F\`**`, inline: true },
        { name: '**Temperature Feels Like..**', value: `**\`${res.main.feels_like} °F\`**`, inline: true },
        { name: '**Pressure**', value: `**\`${res.main.pressure} hPa\`**`, inline: true },
        { name: '**Humidity**', value: `**\`${res.main.humidity}%\`**`, inline: true },
        { name: '**Wind Speed**', value: `**\`${res.wind.speed} m/s\`**`, inline: true },
        { name: '**Wind Direction [°]**', value: `**\`${res.wind.deg}°\`**`, inline: true },
        { name: '**Cloudiness**', value: `**\`${res.clouds.all}%\`**` }
    )
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
}

module.exports.config = {
    category: 'utility',
    cooldown: 10,
    args: true,
    argsError: 'Give a city to retrieve weather data from!'
}

module.exports.info = {
    name: 'weather',
    description: 'Get weather data for a specific city!',
    usage: 'weather <city name>'
}