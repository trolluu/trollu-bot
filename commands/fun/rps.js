const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "🧻", "✂"];

module.exports = {
    name: "rps",
    catgory: "fun",
    description: "Rock Paper Scissors game. React to one the emojis to play the game.",
    usage: "rps",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        const embed = new RichEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, client.user.dispalyAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.clearReactions();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "🧻" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "🧻")) {
                    return "You won!";
                } else if (me === clientChosen) {
                    return "It's tie!";
                } else {
                    return "You lost!";
                }
        }
    }
}
