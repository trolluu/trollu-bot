const { RichEmbed } = require("discord.js");
const randomPuppy = require ("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme.",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/r${random}`)
            .setURL(`https://reddit.com/r/${random}`)

            .setTimestamp();
        
        message.channel.send(embed);
    }
}