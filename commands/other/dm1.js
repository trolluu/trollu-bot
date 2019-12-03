// const Discord = require("discord.js");


// module.exports = {
//     name: "dm",
//     category: "other",
//     description: "",
//     run: async (client, message, args) => {
//         client.on("message", (message) => {
//             msg = message.content.toLowerCase();
//             if(message.author.bot) return;

//             mention = message.mentions.users.first();

//             if(msg.startsWith(prefix + "send")) {
//                 if(mention == null) { return; }
//                 message.delete();
//                 mentionMessage = message.content.slice(8);
//                 mention.sendMessage(mentionMessage);
//                 message.channel.send("done!");
//             }
//         })
//     }
// }