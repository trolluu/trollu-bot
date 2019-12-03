const { RichEmbed } = require("discord.js")



module.exports = {
    name: "reload",
    description: "Reload command",
    usage: "<command>",
    category: "moderation",
    run: async (bot, message, args) => {
        if(message.author.id != "323113623721607168") return message.channel.send("You're the bot the owner!")

        if(!args[0]) return message.channel.send("Please provide a command to reload!")

        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName},js`)]
            bot.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            bot.commands.set(commandName, pull)
        } catch(e) {
            return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
        }
        
        message.channel.send(`The command \`${args[0].toUpperCase()} has been reloaded!`)
    }
}