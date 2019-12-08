module.exports = {
    name: "avatar",
    description: "Sends the user's avatar",
    category: "other",
    usage: "<name>",
    run: async (bot, message, args) => {
        let aTaged = message.mentions.users.first();
        message.channel.send(`Avatar: ${aTaged.message.author.displayName} ${aTaged.displayAvatarURL}`);
    }
}