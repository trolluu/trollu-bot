const { RichEmbed } = require("discord.js");


// const Discord = require("discord.js")


module.exports = {
    run: async (bot, message, args) => {
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
    }};

    bot.on('messageReactionAdd', (reaction, user) => {
        if(user.bot)
            return;

        var roleName = reaction.emoji.name;
        var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        var member = reaction.message.guild.members.find(member => member.id === user.id);

        if(member.roles.has(role.id))
        {
            member.removeRole(role.id).then(member => {
                console.log("Removed " + member.user.username + "from the" + role.name + " role.");
            }).catch(err => console.error);
        }
        else {
            member.addRole(role.id).then(member => {
                console.log("Added " + member.user.username + "to the" + role.name + " role.");
            }).catch(err => console.error);
        }
})