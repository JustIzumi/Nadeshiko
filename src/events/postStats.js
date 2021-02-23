const DBL = require('dblapi.js');

module.exports = async (client) => {
    const dbl = new DBL(process.env.DBLAPI_KEY, client);

    setInterval(async () => {
        const guildCount = await client.shard.fetchClientValues('guilds.cache.size');

        dbl.postStats(guildCount);
    }, 900000);

    dbl.on('error', e => {
        console.log(`ERROR ${e.message}`);
    });
}