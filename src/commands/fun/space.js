module.exports.run = async (client, message, args, utils) => {
    message.channel.send(utils.arguments.split('').join(' '));
}

module.exports.config = {
    category: 'fun',
    args: true,
    argsError: 'What text do you want to s p a c e out?'
}

module.exports.info = {
    name: 'space',
    description: 'S p a c e o u t y o u r m e s s a g e',
    usage: 'space <text>'
}