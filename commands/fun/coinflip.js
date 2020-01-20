module.exports = {
    name: "coinflip",
    category: "fun",
    aliases: ["coinf"],
    //description: "Reports a member.",
    run: async (client,message,args) => {
        if (message.deletable) message.delete();
    
        var coinflip = Math.floor(Math.random()*2);
        if(coinflip === 1) {
          message.channel.send("**ORZEł!** 🦅")
        }
        else{
          message.channel.send("**RESZKA!** 👹")
        }
    }};