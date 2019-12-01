const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    config: {
        name: "cat",
        description: "Sends a picture of a cat!",
        usage: "",
        category: "fun",
        accessableby: "Members",
        aliases: ["catto"]
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generating...")

        fetch("http://aws.random.car/meow")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply("whoops. I broke, try again!")

            let embed = new RichEmbed()
            .setColor("#5780cd")
            .setAuthor(`${bot.user.username} Cats!`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}