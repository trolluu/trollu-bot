module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const welcomeChannel = message.guild.channels.find(c => c.name === '👋witamy👋');
    const verifyChannel = message.guild.channels.find(c => c.name === '✅-weryfikacja');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;

    const a = message.guild.roles.get('665865527939432510'); // Kekowie
    const b = message.guild.roles.get('617308062268653569'); // Właściciel
    const c = message.guild.roles.get('621061858131968000'); // Administrator

    const verify = message.guild.roles.get('617335131891433493'); // Verified

    // Verify a member once they have reacted to the message in the verify channel (gives them the Verified role)
    if (messageReaction.emoji.name === '✅' && message.channel.id === verifyChannel.id) {
        member.addRole(verify).catch(console.error);
        //return messageReaction.remove(member).catch(console.error);
    }

    // Adds/removes a user from a joinable role via the welcome
    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === welcomeChannel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.addRole(a).catch(console.error);
                break;
            case '🇧':
                member.addRole(b).catch(console.error);
                break;
            case '🇨':
                member.addRole(c).catch(console.error);
                break;
            default:
                break;
        }
        return;
    }
};