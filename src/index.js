/**
 * @copyright © szyven (a.k.a niiko) 2020-2021
 * @author szyven (a.k.a niiko)
 */

const Discord = require('discord.js');
const fs = require('fs');
const { join } = require('path');

require('dotenv').config({ path: '../.env' });
const { TOKEN } = process.env;

const { connect } = require('mongoose');

connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const utils = {};

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const AutoPoster = require('topgg-autoposter');
const ap = AutoPoster(process.env.TOPGG_API_KEY, client);

ap.on('posted', () => {
    console.log(`Successfully posted stats to Top.GG at: ${new Date()}`);
});

client.login(TOKEN).catch(err => console.log(err));

const i18n = require('i18n');

i18n.configure({
    locales: ['en'],
    directory: join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    objectNotation: true,
    register: global,
});

fs.readdir('./utils/', async (err, files) => {
    files.forEach(file => require(`./utils/${file}`).run(client, utils));
});

const categories = fs.readdirSync('./commands/');
const compiledJs = fs.readdirSync('../dist');

compiledJs.forEach(folder => {
    const file = fs.readdirSync(`../dist/${folder}`).filter(f => f.endsWith('.js'));

    for (const f of file) {
        const command = require(`../dist/${folder}/${f}`);

        if (!command.info || !command.config) throw new TypeError(`Missing or incorrect "config" or "info" block in ${file}`);
        client.commands.set(command.info.name, command);
    }
});

categories.forEach(category => {
    const commandFile = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

    for (const file of commandFile) {
        const command = require(`./commands/${category}/${file}`);

        if (!command.info || !command.config) throw new TypeError(`Missing or incorrect "config" or "info" block in ${file}`);
        client.commands.set(command.info.name, command);
    }
});