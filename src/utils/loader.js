module.exports.run = async (client, utils) => {
    const eventReq = event => require(`../events/${event}`);

    client.on('ready', async () => eventReq('ready', 'postStats')(client));
    client.on('message', async (message) => eventReq('message')(client, message, utils));

    client.on('guildDelete', async (guild) => eventReq('guildDelete')(client, guild));
    client.on('guildCreate', async (guild) => eventReq('guildCreate')(client, guild));

    client.on('warn', async (w) => eventReq('warn')(w));
    client.on('error', async (e) => eventReq('error')(e));

    client.on('disconnect', async () => eventReq('disconnect')());
    client.on('reconnecting', async () => eventReq('reconnecting')());
};