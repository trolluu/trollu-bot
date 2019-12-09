const Discord = require("discord.js")



module.exports = {
    name: "reload",
    description: "Reload command.",
    usage: "<command>",
    category: "owner",
    run: async (bot, message, args) => {
        if(message.author.id != "323113623721607168") return message.channel.send("You're not the bot owner!").then(m => m.delete(5000))

        if(!args[0]) return message.channel.send("Please provide a command to reload!").then(m => m.delete(5000))

        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)]
            bot.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            bot.commands.set(commandName, pull)
        } catch(e) {
            return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``).then(m => m.delete(5000))
        }
        
        message.channel.send(`The command \`${args[0].toUpperCase()} has been reloaded!`).then(m => m.delete(5000))
    }
}