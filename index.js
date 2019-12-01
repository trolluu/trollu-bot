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

client.on("ready", () => {

module.exports = bot => {
    console.log("Online!")

    let statuses = [
        `${bot.guilds.size}!`,
        "thelp",
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});
    }, 5000)
}    
    
    
    
    
    
    //client.user.setPresence({
        //status: "online",
        //game: {
            //name: "thelp",
            //type: "WATCHING"
        //}
    //});
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

    if (command)
        command.run(client, message, args);

    console.log(`${message.author.username} said: ${message.content}`);
});


client.login(process.env.TOKEN);