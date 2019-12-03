const Discord = require("discord.js")



module.exports = {
    name: "restart",
    description: "Bot restart",
    category: "moderation",
    run: async (bot, message, args) => {
        if(message.author.id != "323113623721607168") return message.channel.send("You're not the bot owner!")
        
        try {
            await message.channel.send("Bot are restarting...")
            process.exit()
        }  catch(e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    
    }
}    