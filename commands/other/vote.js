const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");


module.exports = {
    name: "vote",
    aliases: ["v"],
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
            //msg.delete();

            var roleName = reaction.emoji.name;
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
            var member = reaction.message.guild.members.find(member => member.id === user.id);

            if(member.roles.has(role.id))
            {
                member.removeRole(role.id).then(member => {
                    console.log("Removed " + member.user.username + " from the " + role.name + " role.");
                }).catch(err => console.error);
            }
            else {
                member.addRole(role.id).then(member => {
                    console.log("Added " + member.user.username + " to the " + role.name + " role.");
                }).catch(err => console.error);
            }

            logChannel.send(embed);
        } else if (emoji === "🐒") {
            msg.delete();

            message.reply(`ban canceled.`)
                .then(m => m.delete(10000));
        }
    });

    }










}    