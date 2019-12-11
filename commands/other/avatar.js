const { RichEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Sends the user's avatar.",
    category: "other",
    usage: "<name>",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        // let aTaged = message.mentions.users.first();
        // message.channel.send(`**Avatar:** (${aTaged.displayAvatarURL})`);

        const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle(`${user.tag}s profile picture!`)
        .setURL(user.displayAvatarURL)
        .setImage(user.displayAvatarURL)

        message.channel.send(embed);
    }
}