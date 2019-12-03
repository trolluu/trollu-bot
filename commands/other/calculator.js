const { RichEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
    name: "calculator",
    aliases: ["calc"],
    category: "other",
    description: "",
    run: async (client, message, args, tools) => {
        if(!args[0]) return message.channel.send('Please input a calculation!').then(m => m.delete(5000));

        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        }catch (e) {
            return message.channel.send('Sorry, please input a valid calculation!').then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor(0xffffff)
            .setTitle('Calculator')
            .addField('**Input**', `\`\`\`js\n${args.join('')}\`\`\``)
            .addField('**Output**',`\`\`\`js\n${resp}\`\`\``)

        message.channel.send(embed);
    }
}    