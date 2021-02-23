const { Schema, model } = require('mongoose');

const GuildSchema = new Schema({
    guildId: String,
    prefix: String,
});

module.exports = model('guild', GuildSchema);