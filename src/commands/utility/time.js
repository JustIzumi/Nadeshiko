module.exports.run = async (client, message, args, utils) => {
    const date = new Date()
    message.channel.send('**Current Date and Time**\n**`' + date + '`**');
}

module.exports.config = {
    category: 'utility'
}

module.exports.info = {
    name: 'time',
    description: 'Get the exact time and date!',
    usage: 'time'
}