const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");


module.exports = {
    name: "vote",
    category: "other",
    description: "Vote",
    run: async (client, message, args) => {
        const embed = new RichEmbed()
        .setColor("#ffffff")
        .setFooter(message.guild.me.displayName, client.user.dispalyAvatarURL)
        .setDescription("Add a reaction to one of these emojis!")
        .setTimestamp();

    const promptEmbed = new RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Roles`)
        .setDescription("<:frog:650812189782966303> - Zaba\n" +
        "<:monkey:650812254442225664> - Malpa\n")

    // Send the message
    await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reactioncollector
        const emoji = await promptMessage(msg, message.author, 30, ["🐸", "🐒"]);

        // Verification stuffs
        if (emoji === "🐸") {
            msg.delete();

            toBan.ban(args.slice(1).join(" "))
                .catch(err => {
                    if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
                });

            logChannel.send(embed);
        } else if (emoji === "🐒") {
            msg.delete();

            message.reply(`ban canceled.`)
                .then(m => m.delete(10000));
        }
    });

    }










}    