const { RichEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
    name: "calculator",
    aliases: ["calc"],
    category: "other",
    description: "",
    run: async (bot, message, args, tools) => {
        if(!rags[0]) return message.channel.send('Please input a calculation!');

        let resp;
        try {
            resp = math.eval(args.join(' '));
        }catch (e) {
            return message.channel.send('Sorry, please input a valid calculation!');
        }

        const embed = new RichEmbed()
            .setColor(0xffffff)
            .setTitle('Calculator')
            .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
            .addField('Output',`\`\`\`js\n${resp}\`\`\``)

        message.channel.send(embed);
    }
}    