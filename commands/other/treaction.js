const Discord = require("discord.js")



bot.on('message', message => {
    if(message.author.bot)
    {
        if(message.embeds)
        {
            const embedMsg = message.embeds.find(msg => msg.title === 'Server Roles');
            if(embedMsg)
            {

                message.react('650553517638942722')
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