const { Client, RichEmbed, Collection, message } = require("discord.js");
const token = process.env.token;
const fs = require("fs");

const prefix = "t";

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");


["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

// client.on("ready", () => {
//     console.log("Online!");
//     client.user.setPresence({
//         status: "online",
//         game: {
//             name: "🐒 | thelp",
//             type: "WATCHING"
//         }
//     });
// });


client.on("ready", async () =>{
    console.log(`${client.user.username}, online! on ${client.guilds.size} servers.`);
    function changing_status() {
        let status = ["| thelp |", "| 🐒👀 |", `| ${client.guilds.size} servers! |`, "| 🎄🎁 |"]
        let randomStatus = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(randomStatus, {type: 'WATCHING'});
    }
    setInterval(changing_status, 60000)
});


client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    // if (message.deletable) message.delete();

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
});

/////////////////////////////////////////////////

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome') 

    const embed = new RichEmbed()
    
    .setAuthor(`${message.guild.name}!`)
    .setTitle(`Welcome to *${message.guild.name}*, ${member.displayName}!`)
    .setColor("0xF08080")
    .setDescription(`Welcome to *${message.guild.name}*, ${member.displayName}\nYou are currently in ${channel.name}!\n`)
    //.setURL('<https://github.com/Oribuin/OriWelcomeBot/blob/master/README.md>')
    .setImage('http://i.imgur.com/yVpymuV.png')
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .addBlankField(true)
    .addField("Co tu napisać, czy usunąć?",
    " >> Co tu napisać, czy usunąć? << ")
    .addField("Co tu napisać, czy usunąć??", "[Discord Invite](https://discord.gg/c5JgrnA", true)
    .addField("Co tu napisać, czy usunąć?", "[Github](https://github.com/Oribuin/)", true)
    

    if (!channel) return;
    channel.send({embed})
});


client.login(process.env.TOKEN);
