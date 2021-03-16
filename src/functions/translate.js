const i18n = require('i18n');
const GuildSchema = require('../models/guild.js');

async function translate(phrase, options, message) {
    if (!phrase) throw new TypeError('Parameter "phrase" is reuqired');
    if (!message) throw new TypeError('Parameter "message" is required');

    const data = await GuildSchema.findOne({ guildId: message.guild.id });

    await i18n.setLocale(data.language || 'en');
    const res = await i18n.__mf(phrase, options || false);

    return res;
}

module.exports = translate;