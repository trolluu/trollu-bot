

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warn the member",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        const msg = await message.channel.send("**W budowie!**").then(m => m.delete(5000));





// const { RichEmbed } = require("discord.js");
// const fs = require("fs");
// const ms = require("ms");
// let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


// module.exports = {
//     name: "warn",
//     category: "moderation",
//     description: "Warn the member.",
//     usage: "<id | mention>",
//     run: async (bot, message, args) => {
//         if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
//         let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
//         if(!wUser) return message.reply("Couldn't find them yo");
//         if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay to kewl");
//         let reason = args.join(" ").slice(22);

//         if(!warns[wUser.id]) warns[wUser.id] = {
//             warns: 0
//         };
    
//         warns[wUser.id].warns++;

//         fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
//             if (err) console.log(err)
//         });
    
//         let warnEmbed = new RichEmbed()
//         .setDescription("Warns")
//         .setAuthor(message.author.username)
//         .setColor("#fc6400")
//         .addField("Warned User", `<@${wUser.id}>`)
//         .addField("Warned In", message.channel)
//         .addField("Number of Warnings", warns[wUser.id].warns)
//         .addField("Reason", reason);
    
//         let warnchannel = message.guild.channels.find(channel => channel.name === "warn");
//         if(!warnchannel) return message.reply("Couldn't find channel");

//         warnchannel.send(warnEmbed);

//         if(warns[wUser.id].warns == 2){
//             let muterole = message.guild.roles.find(`name`, "muted");
//             if(!muterole) return message.reply("You should create that role dude.");

//             let mutetime = "10s";
//             await(wUser.addRole(muterole.id));
//             message.channel.send(`<@${wUser.id}> has been temporarily muted`);

//             setTimeout(function(){
//                 wUser.removeRole(muterole.id)
//                 message.channel.send(`<@${wUser.id}> has been unmuted.`)
//             }, ms(mutetime))
//         }
//         if(warns[wUser.id].warns == 3){
//             message.guild.member(wUser).ban(reason);
//             message.reply(`<@${wUser.id}> has been banned.`)
//         }
//     }
// }