/**
 * @copyright © szyven (a.k.a niiko) 2020-2021
 * @author szyven (a.k.a niiko)
 */

const Discord = require('discord.js');
const fs = require('fs');

require('dotenv').config({ path: '../.env' });
const { TOKEN } = process.env;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const utils = {};

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.login(TOKEN).catch(err => console.log(err));

fs.readdir('./utils/', async (err, files) => {
    files.forEach(file => require(`./utils/${file}`).run(client, utils));
});

const categories = fs.readdirSync('./commands/');

categories.forEach(category => {
    const commandFile = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

    for (const file of commandFile) {
        const command = require(`./commands/${category}/${file}`);

        if (!command.info || !command.config) throw new TypeError(`Missing or incorrect "config" or "info" block in ${file}`);
        client.commands.set(command.info.name, command);
    }
});