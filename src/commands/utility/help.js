const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args, utils) => {
    const categories = fs.readdirSync('../src/commands');
    const data = [];
    const { commands } = message.client;

    if (!args[1]) {
        const embed = new MessageEmbed()
            .setTitle('Nadeshiko Command List')
            .setDescription(`**Use \`${utils.prefix}h [command]\` if you need information on a specific command!**\n\u200b`)
            .setColor('RANDOM')
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp()

        categories.forEach(category => {
            const commandArray = commands.filter(command => command.config.category === category)
                .map(cmd => `\`${cmd.info.name}\``).join(', ');

            const fieldTitle = `**${category.charAt(0).toUpperCase() + category.slice(1)} commands:**`;

            if (commandArray !== '') {
                embed.addField(`${fieldTitle}`, `**${commandArray}**`);
            }
        });

        embed.addField('**\u200b\nAdditional Links**', `**[Server](https://discord.gg/h3cqnn2)** | **[Invite](https://bit.ly/2Irfi0C)** | **[Twitter](https://twitter.com/NadeshiDiscord)**`)
        .setFooter(`${commands.size} commands available`, message.author.avatarURL({ dynamic: true }));
        message.channel.send(embed);
    }
    else {
        if (args[1]) {
            const name = args[1].trim().toLowerCase();
            const command = commands.get(name) || commands.find(c => c.config.aliases && c.config.aliases.includes(name));

            if (!command) {
                return;
            }

            data.push(`**Command: \`${command.info.name}\`**`);

            if (command.info.description) data.push(`**Description: \`${command.info.description}\`**`);
            if (command.config.category) data.push(`**Category: \`${command.config.category.charAt(0).toUpperCase() + command.config.category.slice(1)}\`**`);
            if (command.info.usage) data.push(`**Usage(s): \`${command.info.usage}\`**`);
            if (command.config.aliases) data.push(`**Alias(es): \`${command.config.aliases.join(', ')}\`**`);
            if (command.config.cooldown) data.push(`**Cooldown: \`${command.config.cooldown}\`**`);

            message.channel.send(data, { split: true });
        }
    }
}


module.exports.config = {
    aliases: ['h', 'commands'],
    category: 'utility'
}

module.exports.info = {
    name: 'help',
    description: 'Check out a list of all commands!',
    usage: 'help | help <command>'
}