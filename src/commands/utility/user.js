const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const user = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(user.id);

    const flags = {
        DISCORD_EMPLOYEE: 'Discord Employee',
        DISCORD_PARTNER: 'Discord Partner',
        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
        HYPESQUAD_EVENTS: 'HypeSquad Events',
        HOUSE_BRAVERY: 'House of Bravery',
        HOUSE_BRILLIANCE: 'House of Brilliance',
        HOUSE_BALANCE: 'House of Balance',
        EARLY_SUPPORTER: 'Early Supporter',
        TEAM_USER: 'Team User',
        SYSTEM: 'System',
        VERIFIED_BOT: 'Verified Bot',
        VERIFIED_DEVELOPER: 'Verified Bot Developer'
    };

    const status = {
        'online': 'Currently Online',
        'idle': 'Idle',
        'dnd': 'Do not Disturb',
        'offline': 'Currently Offline or Invisible'
    }

    const defaultRole = message.guild.roles.cache.get(message.guild.id);
    const roles = member.roles.cache
        .filter(role => role.id !== defaultRole.id)
        .map(role => role.name).join(', ');

    let str_ending = '';
    if (roles.length > 75) str_ending = '...';

    const presence = user.presence.activities.toString();
    const userFlags = user.flags.toArray();

    const embed = new MessageEmbed()
        .setAuthor(`${user.tag}`, user.avatarURL({ dynamic: true }))
        .setDescription(`**User ID: \`${user.id}\`**`)
        .addField('**Flags**', `${userFlags.length ? `**\`${userFlags.map(flag => flags[flag]).join(', ')}\`**` : '**`This user doesn\'t have any flags!`**'}`)
        .addField('**Nickname**', member.nickname ? `**\`${member.nickname}\`**` : '**`This user doesn\'t have a nickname set in this server!`**')
        .addField('**Current Application**', presence ? `**\`${presence.replace(/,/g, ', ')}\`**` : `**\`${user.username} isn't in any applications right now!\`**`)
        .addField('**Status**', `**\`${status[member.user.presence.status]}\`**`)
        .addField('**Account Creation**', `**\`${moment.utc(user.createdAt).format('MM/DD/YYYY h:mm A')}\`**`, true)
        .addField('**Server Join Date**', `**\`${moment.utc(member.joinedAt).format('MM/DD/YYYY h:mm A')}\`**`, true)
        .addField('**Roles**', roles ? `**\`${roles.substring(0, 75)}${str_ending}\`**` : `**This user doesn't have any roles!**`)
        .setColor(member.displayHexColor)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

    message.channel.send(embed);
}

module.exports.config = {
    category: 'utility',
    aliases: ['userinfo', 'whois', 'u']
}

module.exports.info = {
    name: 'user',
    description: 'Get information about a user!'
}