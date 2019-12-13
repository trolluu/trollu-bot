const { RichEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
    name: "weather",
    category: "info",
    description: "Shows the weather.",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
        if(err) message.channel.send(err);

        if(result.length === 0) {
            message.channel.send('**Please enter a valid location.**')
        }
    
        var current = result[0].current;
        var location = result[0].location;

        const embed = new RichEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x00AF86)
        .addField('Timezone', `GMT ${location.timezone}`, true)
        .addField('Degree Type',location.degreetype, true)
        .addField('Temperature',`${current.temperature} °C`, true)
        .addField('Feels Like', `${current.feelslike} °C`, true)
        .addField('Winds',current.winddisplay, true)
        .addField('Humidity', `${current.humidity}%`, true)

        .setTimestamp();

        message.channel.send({embed});
    })
    }
}    
