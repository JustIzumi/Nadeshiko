const { Schema, model } = require('mongoose');

const GuildSchema = new Schema({
    guildId: String,
    prefix: {
        type: String,
        default: 'n!'
    },
    language: {
        type: String,
        default: 'en'
    }
});

module.exports = model('guild', GuildSchema);