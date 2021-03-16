const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const { data } = await get(`http://ip-api.com/json/${args[1]}`);

    if (data.status == 'fail') return message.channel.send('**Failed to process the request! Please try again!**');

    const embed = new MessageEmbed()
    .setTitle(`**Results for \`${args[1]}\`**`)
    .addFields(
        { name: '**Country**', value: `**\`${data.country} [${data.countryCode}]\`**`, inline: true },
        { name: '**Region**', value: `**\`${data.regionName} [${data.region}]\`**`, inline: true },
        { name: '**City**', value: `**\`${data.city}\`**`, inline: true },
        { name: '**District**', value: `**\`${data.district ? data.district : 'None'}\`**` },
        { name: '**Timezone**', value: `**\`${data.timezone}\`**` },
        { name: '**ISP**', value: `**\`${data.isp}\`**`, inline: true },
        { name: '**Organization**', value: `**\`${data.org ? data.org : 'None'}\`**`, inline: true },
    )
    .setColor('RANDOM')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()

    message.channel.send(embed);
}

module.exports.config = {
    category: 'utility',
    args: true,
    argsError: 'Give an IP to look up!'
}

module.exports.info = {
    name: 'ip',
    description: 'Look up info about an IP adress!',
    usage: 'ip <ip adress>'
}