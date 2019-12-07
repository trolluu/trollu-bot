const { RichEmbed } =require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["ig"],
    description: "Find out some nice instagram statistics.",
    category: "info",
    usage: "<name>",
    run: async (bot, message, args) => {
        const name = args.join(" ");

        if(!name) {
            return message.channel.send("Maybe it's useful actually serch for someone...!")
            .then(m => m.delete(5000));
        }
    
        const url = `https://instagram.com/${name}/?__a=1`;
        const res = await fetch(url).then(url => url.json());

        if(!res.graphql.user.username) {
            return message.reply("I couldn't find that account... :(")
            .then(m => m.delete(5000));
        }
    
        const account = res.graphql.user;

        const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle(account.full_name)
        .setURL(`https://instagram.com/${name}`)
        .setThumbnail(account.profile_pic_url_hd)
        .addField("Profile information", stripIndents`**- Username:** ${account.username}
        **- Full name:** ${account.full_name}
        **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
        **- Posts:** ${account.edge_owner_to_timeline_media.count}
        **- Followers:** ${account.edge_followed_by.count}
        **- Following:** ${account.edge_follow.count}
        **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);

        message.channel.send(embed);
    }
}    