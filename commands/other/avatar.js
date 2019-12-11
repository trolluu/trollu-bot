const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "avatar",
    description: "Sends the user's avatar.",
    category: "other",
    usage: "<name>",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        
        const member = getMember(message, args.join(""));

        const embed = new RichEmbed()
        .setColor("RANDOM")
        .setFooter(member.displayName, member.user.displayAvatarURL)
        .setTitle(`${member.user.tag}'s profile picture!`)
        .setURL(member.user.displayAvatarURL)
        .setImage(member.user.displayAvatarURL)
        .setTimestamp()

        message.channel.send(embed);
    }
}