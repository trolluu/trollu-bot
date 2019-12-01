const Discord = require("discord.js")

module.exports = {
    name: "react",
    description: "",
    category: "other",
    accessableby: "Members",
    run: async (bot, message, args) => {
        if(message.author.id != "323113623721607168") return;
        message.react('🐒');
    }
}