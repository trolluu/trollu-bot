const { RichEmbed } = require("discord.js");


module.exports = {
    name: "verify",
    category: "owner",
    description: "Add reactoin to verify.",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
      
      
         //if (!message.member.hasPermission("ADMINISTRATOR")) {
            //return message.reply("❌ You do not have permissions to commmand **verify**!").then(m => m.delete(5000));
            if(message.author.id != "323113623721607168") { 
              return message.channel.send("You're not the bot owner!").then(m => m.delete(5000))
        const embed = new RichEmbed()
            .setTitle("Verification")
            .setColor("#8FA2FF")
            .setDescription("Add reaction to verify.");
    
      
        let msg = await message.channel.send(embed);

          await msg.react('✅');
    }}}