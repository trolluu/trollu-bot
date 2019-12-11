const ascii = require("ascii-art");

module.exports = {
    name: "ascii",
    description: "",
    category: "fun",
    usage: "<text>",
    run: async (bot, message, args) => {
        if(!args.join(' ')) return message.reply("Please specify texts for the ascii conversion!");

        ascii.font(args.join(' '), 'Doom', async txt => {
            message.channel.send(txt, {
                code: 'md'
            });
        });
    }
}