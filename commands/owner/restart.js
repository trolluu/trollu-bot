const Discord = require("discord.js")



module.exports = {
    name: "restart",
    description: "Bot restart.",
    category: "owner",
    run: async (bot, message, args) => {
        if(message.author.id != "323113623721607168") return message.channel.send("You're not the bot owner!").then(m => m.delete(5000))
        
        try {
            await message.channel.send("Bot are restarting...").then(m => m.delete(5000))
            process.exit()
        }  catch(e) {
            message.channel.send(`ERROR: ${e.message}`).then(m => m.delete(5000))
        }
    
    }
}    