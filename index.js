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
    console.log("Online!");
    client.user.setPresence({
        status: "online",
        game: {
            name: "🐒 | thelp",
            type: "WATCHING"
        }
    });
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

// React
if(message.author.bot)
    {
        if(message.embeds)
        {
            const embedMsg = message.embeds.find(msg => msg.title === 'Server Roles');
            if(embedMsg)
            {

                embedMsg.message.react('650553517638942722')
                .then(reaction => reaction.message.react('650553553663950848'))
                .then(reaction => reaction.message.react('650553843725369355'))
                .then(reaction => reaction.message.react('650559284685307935'))
                .then(reaction => reaction.message.delete(20000))
                .then(msg => console.log("Deleted message"))
                .catch(err => console.error);
            }
        }
        return;
    }
    if(message.content.toLowerCase() === 'treaction')
    {
        const embed = new RichEmbed();
        embed.setTitle("Server Roles");
        embed.setColor("RANDOM");
        embed.setDescription("<:monkey:650553517638942722> - Małpa\n" +
        "<:frog:650553553663950848> - Żaba\n" +
        "<:poop:650553843725369355> - Kupa\n" +
        "<:ok_hand:650559284685307935> - Ok\n");



        message.channel.send(embed);
    }



});


client.login(process.env.TOKEN);