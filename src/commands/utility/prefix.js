const GuildShema = require('../../models/guild.js');

module.exports.run = async (client, message, args, utils) => {
    const prefix = await GuildShema.findOne({ guildId: message.guild.id });

    if (prefix) {

        await GuildShema.findOneAndUpdate({ guildId: message.guild.id }, { prefix: args[1] },
            function (err) {
                if (err) return console.log(err);
                message.channel.send(`**Successfully set the prefix to \`${args[1]}\`**`);
            });

    } else if (!prefix) {
        const setNewPrefix = new GuildShema({
            guildId: message.guild.id,
            prefix: args[1]
        });
        setNewPrefix.save();

        message.channel.send(`**Successfully set the prefix to \`${args[1]}\`**`);
    }
}

module.exports.config = {
    aliases: ['p', 'setprefix'],
    category: 'utility',
    cooldown: 30,
    args: true,
    argsError: 'What to set the prefix to?'
}

module.exports.info = {
    name: 'prefix',
    description: 'Change the prefix of the bot in your server!',
    usage: 'prefix <prefix>'
}
