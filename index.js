const { Client, RichEmbed, Collection } = require("discord.js");
const token = process.env.token;
const ownerID = process.env.ownerID
const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require('ffmpeg');
let cooldown = new Set();
let cdseconds = 5;

const prefix = "t";

const client = new Client({
    disableEveryone: true
});

var servers = {};


const botStats = {
    totalGuildsID: '653708455181287494',
    totalUsersID: '653708378476118016',
    totalChannelsID: '653708597074591784'
};





client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split('.')[0];
      console.log(`Loaded event '${evtName}'`);
      client.on(evtName, evt.bind(null, client));
    });
  });

client.categories = fs.readdirSync("./commands/");


["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

// client.on("ready", () => {
//     console.log(`${client.user.username}, online! on ${client.guilds.size} servers.`);
//     client.user.setPresence({
//         status: "idle",
//         game: {
//             name: "🔧 Jak naprawić passata 🔧 - ⛔ PRZERWA TECHNICZNA ⛔",
//             type: "WATCHING"
//         }
//     });
// });


client.on("ready", async () =>{
    console.log(`${client.user.username}, online! on ${client.guilds.size} servers.`);
    function changing_status() {
        let status = ["| thelp |", "| 🐒👀 |", `| ${client.guilds.size} servers! |`]
        let randomStatus = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(randomStatus, {type: 'WATCHING'});
    }
    setInterval(changing_status, 60000)
});


client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    
    if(cooldown.has(message.author.id)) {
        message.delete();
        return message.reply("You have to wait 5 seconds between commands.").then(m => m.delete(5000))
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        cooldown.add(message.author.id);
    }
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
     //if (message.deletable) message.delete({timeout: 3000});

    if (command)
        command.run(client, message, args);

    console.log(`${message.author.username} said: ${message.content} | ${message.channel.name} | ${message.guild.name}`);

    // Dm //
    msg = message.content.toLowerCase();
    if(message.author.bot) return;

    mention = message.mentions.users.first();

    if(msg.startsWith(prefix + "dm")) {
        if(mention == null) { return; }
        message.delete();
        mentionMessage = message.content.slice(4);
        mention.sendMessage(mentionMessage);
        message.channel.send("done!").then(m => m.delete(3000));
    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)

});

/////////////////////////////////////////////////
//                  Welcomer                   //
/////////////////////////////////////////////////
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === '👋witamy👋') 

    const embed = new RichEmbed()
    
    //.setAuthor("Nowy Użytkownik")
    .setFooter(`${member.guild.name}` , `${member.guild.iconURL}`)
    .setTitle(`*Nowy Użytkownik*`)
    .setColor("#66ff33")
    .setDescription(`*Siemano!*\n${member.user.tag}\n`)
    //.setURL('<https://github.com/Oribuin/OriWelcomeBot/blob/master/README.md>')
    //.setImage('http://i.imgur.com/yVpymuV.png')
    .setThumbnail(`${member.user.displayAvatarURL}`)
    //.addBlankField(true)
    //.addField(`${member.user.tag}`)
    //.addField("Co tu napisać, czy usunąć??", "[Discord Invite](https://discord.gg/c5JgrnA", true)
    //.addField("Co tu napisać, czy usunąć?", "[Github](https://github.com/Oribuin/)", true)
    .setTimestamp()
    

    if (!channel) return;
    channel.send({embed})
});


client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === '😔żegnamy😔') 

    const embed = new RichEmbed()
    
    //.setAuthor("Nowy Użytkownik")
    .setFooter(`${member.guild.name}` , `${member.guild.iconURL}`)
    .setTitle(`*Użytkownik wyszedł :(*`)
    .setColor("#fd0204")
    .setDescription(`*No i kurwa masz przejebane!*\n${member.user.tag}\n`)
    //.setURL('<https://github.com/Oribuin/OriWelcomeBot/blob/master/README.md>')
    //.setImage('http://i.imgur.com/yVpymuV.png')
    .setThumbnail(`${member.user.displayAvatarURL}`)
    //.addBlankField(true)
    //.addField(`${member.user.tag}`)
    //.addField("Co tu napisać, czy usunąć??", "[Discord Invite](https://discord.gg/c5JgrnA", true)
    //.addField("Co tu napisać, czy usunąć?", "[Github](https://github.com/Oribuin/)", true)
    .setTimestamp()
    

    if (!channel) return;
    channel.send({embed})
});

client.on('guildCreate', guild => {
    client.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${client.guilds.size}`);
    client.channels.get(botStats.totalUsersID).setName(`Total Users : ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
    client.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${client.channels.size}`);
});

client.on('guildDelete', guild => {
    client.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${client.guilds.size}`);
    client.channels.get(botStats.totalUsersID).setName(`Total Users : ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
    client.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${client.channels.size}`);
});
//////////////////////////////////////////////////
//                  Music                       //
//////////////////////////////////////////////////

// client.on('message', message => {

//     let args = message.content.substring(prefix.length).split(" ");

//     switch (args[0]) {
//         case 'play':
            
//             function play(connection, message) {
//                 var server = servers[message.guild.id];

//                 server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

//                 server.queue.shift();

//                 server.dispatcher.on("end", function() {
//                     if(server.queue[0]) {
//                         play(connection, message);
//                     }else {
//                         connection.disconnect();
//                     }
//                 });
//             }
        
//             if(!args[1]) {
//                 message.channel.send("You need to provide a link!").then(m => m.delete(5000));
//                 return;
//             }

//             if(!message.member.voiceChannel) {
//                 message.channel.send("You must be in a channel to play the bot!").then(m => m.delete(5000));
//                 return;
//             }

//             if(!servers[message.guild.id]) servers[message.guild.id] = {
//                 queue: []
//             }

//             var server = servers[message.guild.id];

//             server.queue.push(args[1]);

//             if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
//                 play(connection, message);
//             })
        




//         break;
    
//         case 'skip':
//             var server = servers[message.guild.id];
//             if(server.dispatcher) server.dispatcher.end();
//             message.channel.send("Skipping the song!").then(m => m.delete(5000))
//         break;

//         case 'stop':
//             var server = servers[message.guild.id];
//             if(message.guild.voiceConnection) {
//                 for(var i = server.queue.length -1; i >=0; i--) {
//                     servers.queue.splice(i, 1);
//                 }
            
//                 server.dispatcher.end();
//                 message.channel.send("Ending the queue leaving the voice channel!").then(m => m.delete(5000))
//                 console.log('stopped the queue')
            
//             }
//         break;
//     }
// });

client.login(process.env.TOKEN);
