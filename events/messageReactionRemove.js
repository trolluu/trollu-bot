module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const channel = message.guild.channels.find(c => c.name === '✅-weryfikacja');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;

    const a = message.guild.roles.get('665865527939432510'); // Kekowie
    const b = message.guild.roles.get('617308062268653569'); // Właściciel
    const c = message.guild.roles.get('621061858131968000'); // Administrator


    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.removeRole(a).catch(console.error);
                break;
            case '🇧':
                member.removeRole(b).catch(console.error);
                break;
            case '🇨':
                member.removeRole(c).catch(console.error);
                break;
            default:
                break;
        }
    }
};