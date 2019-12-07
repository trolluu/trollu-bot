const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "music",
    description: "",
    run: async (client, message, args, active) => {
        if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
        if(!args[0]) return message.channel.send("Sorry, please input a url following the command.");

        let validate = await ytdl.validateURL(args[0]);

        if(!validate) return message.channel.send("Sorry, please input a **valid** url following the command.");

        let info = await ytdl.videoInfo(args[0]);

        let data = active.get(message.guild.id) || {};
        if(!data.connection) data.connection = await message.member.voiceChannel.join();
        if(!data.queue) data.queue = [];
        data.guildID = message.guild.id;

        data.queue.push ({
            songTitle: info.queue,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id
        });
    
        if(!data.dispatcher) play(client, data, active);
        else {
            message.channel.send(`Added To Queue: ${info.title} | Requested By: ${message.author.id}`);
        }
    
        active.set(message.guild.id, data);
    }
}

async function play(client, data) {
    client.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`);

    data.dispatcher = await connection.playStream(ytdl(data.queue[0].url, { filter: "audioonly" }));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once("finish", function() {
        end(client, data);
    });
}

function end(client, dispatcher, active) {
    let fetched = active.get(dispatcher.guildID);

    fetched.queue.shift();

    if(fetched.queue.length > 0) {
        active.set(dispatcher.guildID, fetched);

        play(client, fetched);
    } else {
        active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if(vc) vc.leave();
    }
}