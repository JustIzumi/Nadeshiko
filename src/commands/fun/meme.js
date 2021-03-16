const { get } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

    const subReddits = [
        'dankmemes',
        'memes',
        'Me_irl'
    ];

    const sub = subReddits[Math.floor(Math.random() * subReddits.length)];
    const { data: res } = await get(`https://reddit.com/r/${sub}/top/.json?limit=50`);
    const postNumber = Math.floor(Math.random() * 50) + 1;

    const base = res.data.children[postNumber].data;
    
    if (base.over_18 === true && message.channel.nsfw === false) {
        return message.channel.send(`**Oops! We ran into an NSFW post!\nTo see NSFW posts, please move into an NSFW channel!**`);
    }

    const embed = new MessageEmbed()
        .setTitle(`**${base.title}**`)
        .setURL(`https://reddit.com${base.permalink}`)
        .setDescription(`**Posted on \`${base.subreddit_name_prefixed}\` by \`${base.author}\`**`)
        .setImage(base.url)
        .setColor('RANDOM')
        .setFooter(`Upvotes: ${base.score}`)
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.config = {
    category: 'fun'
}

module.exports.info = {
    name: 'meme',
    description: 'Get a random meme straight from Reddit!',
    usage: 'meme'
}