const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { formatDate } = require("../../functions.js");

module.exports = {
    name: "botinfo",
    aliases: ["boti"],
    description: "Bot information.",
    category: "info",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();

        const created = formatDate(bot.user.createdAt);

        const embed = new RichEmbed()
            .setColor("RANDOM")
            //.setTitle(account.full_name)
            //.setURL(`https://instagram.com/${name}`)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot information", stripIndents`**- Username:** ${bot.user.username}
            **- Created On:** ${created}
            **- Favourite car:** Volkswagen Passat B5 1.9 TDI
            **- Owner:** trollu_#4005`)

            .setTimestamp()

        if (bot.user.presence.game)
            embed.addField('Currently playing', `>** Name:** ${bot.user.presence.game.name}`)

        message.channel.send(embed);
    }
}