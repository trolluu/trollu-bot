const { RichEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    category: "other",
    description: "",
    usage: "<poll question>",
    run: async (bot, message, args) => {
        //if(!message.member.roles.find(r => r.name === 'roleName')) return message.channel.send('This requires the role: roleName!').then(m => m.delete(5000));
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires the permission: ADMINISTRATOR!').then(m => m.delete(5000));
        
        if(!args[0]) return message.channel.send('Proper Usage: <prefix>poll question').then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor(0xffffff)
            .setFooter('React to vote.')
            .setDescription(args.join(' '))
            .setTitle(`Poll Created By ${message.author.username}`);

        let msg = await message.channel.send(embed);

        await msg.react('✅');
        await msg.react('❌');

        message.delete({timeout: 1000});
    }
}