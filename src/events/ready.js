module.exports = async (client) => {

    console.log(`Nadeshiko ready\n${client.commands.size} commands loaded`);
    client.user.setStatus('online');

    setInterval(async () => {
        const guildCount = await client.shard.fetchClientValues('guilds.cache.size');
        const userCount = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')

        const statusList = [
            `${guildCount.reduce((acc, guildCount) => acc + guildCount, 0)} guilds`,
            `with ${userCount.reduce((acc, userCount) => acc + userCount, 0)} users`,
            `${process.env.PREFIX}help`,
        ]

        const status = statusList[Math.floor(Math.random() * statusList.length)];

        client.user.setActivity({
            name: status,
            type: 'PLAYING'
        });

    }, 25000)
};