const DBL = require('dblapi.js');

module.exports = async (client) => {
    const dbl = new DBL(process.env.DBLAPI_KEY, client);

    setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 900000);

    dbl.on('error', e => {
        console.log(`ERROR ${e.message}`);
    });
}