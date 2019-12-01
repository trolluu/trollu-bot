const { Client, RichEmbed, Collection } = require("discord.js");
const token = process.env.token;
const fs = require("fs");

const prefix = "t";

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

//config({
  //  path: __dirname + "/.env"
//});

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
        let status = ["thelp", "🐒_🐒", `${client.guilds.size} servers!`]
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
    if (!command) command = client.commands.get(client.aliases.get(cmd)).then(m => m.delete(5000));
    

    if (command)
        command.run(client, message, args);

    console.log(`${message.author.username} said: ${message.content}`);

});


client.login(process.env.TOKEN);