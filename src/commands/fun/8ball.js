const { get } = require('axios');

module.exports.run = async (client, message, args, utils) => {

    const { data } = await get(`https://8ball.delegator.com/magic/JSON/${utils.arguments}`);
    message.channel.send(`**Question: \`${data.magic.question}\`\nAnswer: \`${data.magic.answer}\`**`);
}

module.exports.config = {
    category: 'fun',
    aliases: ['8b', '8'],
    args: true,
    argsError: 'What question would you like to ask the magic 8ball?'
}

module.exports.info = {
    name: '8ball',
    description: 'You give a question, the magic 8ball gives an answer!',
    usage: '8ball <question>'
}