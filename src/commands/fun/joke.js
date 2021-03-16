const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    const { data: res } = await get(`https://reddit.com/r/Jokes/top/.json?limit=25`);
    const postNumber = Math.floor(Math.random() * 25) + 1;

    const base = res.data.children[postNumber].data;

    if (base.over_18 === true && message.channel.nsfw === false) {
        return message.channel.send(`**Oops! We ran into an NSFW post!\nTo see NSFW posts, please move into an NSFW channel!**`);
    }

    const embed = new MessageEmbed()
        .setTitle(`**${base.title}**`)
        .setURL(`https://reddit.com${base.permalink}`)
        .setDescription(`**\`${base.selftext}\`**`)
        .setColor('RANDOM')
        .setFooter(`Posted on ${base.subreddit_name_prefixed} by ${base.author} | Upvotes: ${base.score}`)
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.config = {
    category: 'fun'
}

module.exports.info = {
    name: 'joke',
    description: 'Get a random joke from r/Jokes',
    usage: 'joke'
}