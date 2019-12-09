const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "Tempmute the member.",
    usage: "<id | 1s/m/h/d>",
    run: async (bot, message, args) => {
      if (message.deletable) message.delete();
      
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.").then(m => m.delete(5000));
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!").then(m => m.delete(5000));
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!").then(m => m.delete(5000));

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`).then(m => m.delete(10000));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`).then(m => m.delete(5000));
  }, ms(mutetime));

}}