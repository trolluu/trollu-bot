const Discord = require("discord.js")



module.exports = {
    name: "shutdown",
    description: "Bot shutting down",
    category: "moderation",
    run: async (bot, message, args) => {
        if(message.author.id != "323113623721607168") return message.channel.send("You're the bot the owner!")
        
        try {
            await message.channel.send("Bot is shutting down...")
            process.exit()
        }  catch(e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    
    }
}    