const GuildSchema = require('../models/guild.js');

module.exports = async (client, guild) => {
    await GuildSchema.findOneAndRemove({ guildId: guild.id }, (err) => {
        if (err) return console.error(err);
    });
}