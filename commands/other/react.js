// const Discord = require("discord.js")

// module.exports = {
//     name: "react",
//     description: "Add a reaction.",
//     category: "other",
//     accessableby: "Members",
//     run: async (bot, message, args) => {
//         if(message.author.id != "323113623721607168") return;
//         message.react('🐒');
//     }
// }

// client.on('message', message => {
//     if(message.author.bot)
//     {
//         if(message.embeds)
//         {
//             const embedMsg = message.embeds.find(msg => msg.title === 'Server Roles');
//             if(embedMsg)
//             {

//                 messgae.react('')
//                 .then(reaction => reaction.message.react(''))
//                 .then(reaction => reaction.message.react(''))
//                 .then(reaction => reaction.message.react(''))
//                 .then(reaction => reaction.message.delete(5000))
//                 .then(msg => console.log("Deleted message"))
//                 .catch(err => console.error);
//             }
//         }
//         return;
//     }
//     if(message.content.toLoweCase() === 'treact')
//     {
//         const embed = new RichEmbed();
//         embed.setTitle("Server Roles");
//         embed.setColor("RANDOM");
//         embed.setDescription("<:monkey:650553517638942722>")



//         message.channel.send(embed);
//     }    
// });    