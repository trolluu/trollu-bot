module.exports = {
    name: "avatar",
    description: "Sends the user's avatar",
    category: "other",
    usage: "<name>",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(""));
        let aTaged = message.mentions.users.first();
        message.channel.send(`Avatar: ${member.displayName} ${aTaged.displayAvatarURL}`);
    }
}