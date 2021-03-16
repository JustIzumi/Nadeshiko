module.exports.run = async (client, message, args, utils) => {
    message.channel.send(`**Current date and time: \`${new Date().toLocaleString()}\`**`);
}

module.exports.config = {
    category: 'utility'
}

module.exports.info = {
    name: 'time',
    description: 'Get the exact time and date!',
    usage: 'time'
}