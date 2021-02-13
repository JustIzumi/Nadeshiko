module.exports.run = async (client, message, args, utils) =>  {

    const msgOwoified = utils.arguments
    .replace(/l|r/g, 'w')
    .replace(/R|L/g, 'W');

    message.channel.send(`**${message.author.username} said:\n\`${msgOwoified}\`**`);
}

module.exports.config = {
    aliases: ['owoify'],
    category: 'fun',
    args: true,
    argsError: 'What text do you want to OwOIfy?'
}

module.exports.info = {
    name: 'owo',
    description: 'OwOIfy a message!',
    usage: 'owo <text>'
}