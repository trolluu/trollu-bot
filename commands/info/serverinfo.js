const { Richembed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    description: "Server information.",
    category: "info",
    run: async (bot, message, args) => {
        
        const embed = new RichEmbed()
        .setColor("RANDOM")
        //.setTitle(account.full_name)
        //.setURL(`https://instagram.com/${name}`)
        .setThumbnail(message.guild.displayAvatarURL)
        .addField("Server information", stripIndents`**- Server Name:** ${message.guild.name}
        **- Created On:** ${message.guild.createdAt}
        **- You Joined:** ${message.member.joinedAt}
        **- Total Members:** ${message.guild.memberCount}`);

        message.channel.send(embed);
    }
}    