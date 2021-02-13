module.exports.run = async (client, message, args, utils) => {
    const options = ['Head', 'Tail'];
    const specialAnswerNumber = Math.floor(Math.random() * 100) + 1;
    const randomOption = options[Math.floor(Math.random() * options.length)];

    message.channel.send('**Heads or tails?...**').then((msg) => {
        setTimeout(() => {
            if (specialAnswerNumber <= 10) {
                return msg.edit('**`The coin has transcended into another dimension. I really doubt that you will every find it...`**');
            }
            msg.edit(`**\`${randomOption}\`**`);
        }, 1000);
    })
}

module.exports.config = {
    category: 'fun'
}

module.exports.info = {
    name: 'coin',
    description: 'Flip a coin!',
    usage: 'coin'
}