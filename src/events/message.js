const Discord = require('discord.js');
const convertms = require('humanize-duration');
const { MessageEmbed } = require('discord.js');

const GuildShema = require('../models/guild.js');

module.exports = async (client, message, utils) => {

    if (message.channel.type !== 'dm') {

        const data = await GuildShema.findOne({ guildId: message.guild.id });
        const prefix = data ? data.prefix : process.env.PREFIX;

        if (message.author.bot || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const cmdName = args[0].toLowerCase();
        const command = message.client.commands.get(cmdName)
            || message.client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(cmdName));

        if (!command) return;

        if (command.config.argsError && args.length < 2 && command.info.usage) {
            return message.channel.send(`**${command.config.argsError} \`${command.info.usage}\`**`);
        }

        if (command.config.admin === true && message.author.id !== process.env.OWNER) {
            return message.channel.send('**You\'re not permitted to use this command!**').then(() => {
                message.delete({ timeout: 3000 });
            });
        }

        if (!client.cooldowns.has(command.info.name)) {
            client.cooldowns.set(command.info.name, new Discord.Collection());
        }

        const timestamps = client.cooldowns.get(command.info.name);
        const cooldownAmount = (command.config.cooldown || 1.5) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (Date.now() < expirationTime) {
                const timeLeft = expirationTime - Date.now();
                const embed = new MessageEmbed()
                    .setTitle('You\'re on cooldown!')
                    .setDescription(`**Please wait \`${convertms(timeLeft.toFixed(1))}\` more before retrying to use this command!**`)
                    .setColor('RANDOM')
                    .setTimestamp()

                message.channel.send(embed).then(() => {
                    message.delete({ timeout: 3000 });
                    return;
                });
            }
        }

        timestamps.set(message.author.id, Date.now());
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        const arguments = args.join(' ').slice(cmdName.length).trim();

        utils.prefix = prefix;
        utils.arguments = arguments;

        try {
            message.channel.startTyping(1);
            command.run(client, message, args, utils);
        } catch (error) {
            console.log(error);
            message.channel.send('**We ran into a problem! If this keeps happening, please contact the developer!**');
        } finally {
            message.channel.stopTyping();
        }
    }
}