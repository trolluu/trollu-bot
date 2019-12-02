const ytdl = require('ytdl-core');
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "play",
    category: "music",
    description: "",
    usage: "<link>",
    run: async (bot, message, args) => {
        if(!message.member.voiceChannel) return message.channel.send('Please connect to voice channel!');
        if(message.guild.me.voiceChannel) return message.channel.send('Sorry, the bot is already connected to the guild!');
        if(!args[0]) return message.channel.send('Sorry, please input a url following the command!');
        
        let validate = await ytdl.validateURL(args[0]);
        if(!validate) return message.channel.send('Sorry, please input a **valid** url following the commad!');

        let info = await ytdl.getInfo(args[0]);
        let connction = await message.member.voiceChannel.join();
        let dispatcher = await connction.play(ytdl(args[0], {filter: 'audioonly'}));

        message.channel.send(`Now playing: ${info.title}`);
    }
}