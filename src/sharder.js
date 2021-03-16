/**
 * @copyright © szyven (a.k.a niiko) 2020-2021
 * @author szyven (a.k.a niiko)
 */

require('dotenv').config({ path: '../.env' });
const { ShardingManager } = require('discord.js');
const path = require('path');

const manager = new ShardingManager(path.join(__dirname, '/index.js'), { token: process.env.TOKEN });

manager.on('shardCreate', shard => console.log(`Shard #${shard.id} has been launched`));
manager.spawn();