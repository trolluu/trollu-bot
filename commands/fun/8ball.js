const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    category: "fun",
    description: "Ask a question",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        
        if(!args[2]) return message.reply("Please ask a full question!");
        let replies = ["Yes.", "No.", "I don't know.", "Ask again later"];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(1).join(" ");

        let ballembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("#FF9900")
        .addField("Question", question)
        .addField("Answer", replies[result])
        
        .setTimestamp();
        
        message.channel.send(ballembed);
    }
}