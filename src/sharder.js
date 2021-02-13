const { ShardingManager } = require('discord.js');
require('dotenv').config({ path: '../.env' });

const manager = new ShardingManager('./index.js', { token: process.env.TOKEN });

manager.on('shardCreate', shard => console.log(`Shard #${shard.id} has been created`));
manager.spawn();