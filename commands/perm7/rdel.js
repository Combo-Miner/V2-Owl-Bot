const Discord = require("discord.js");
const db = require("quick.db")


module.exports = {
name: "rdel",
helpname : 'rdel <salon> <ID> <role> <emoji>',
usage: "rrdel [channel mention | channelID] [messageID] [role mention | roleID] [emoji]",
run: async (client, message, args) => {
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channel) return message.channel.send(`Aucun salon trouvé pour \`${args[0] ? "rien" : args[0]}\``);
    let msg = await channel.messages.fetch(args[1]);
    if (!msg) return message.channel.send(`Aucun message trouvé pour \`${args[1]}\``);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if(!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``);
    message.react(args[3]).then(async()=> {
        let pog = db.get(`reactions_${message.guild.id}_${msg.id}`)
        if (pog) {
        let data = pog.find((x) => x.emoji === args[3]);
    if (pog && pog.find((x) => x.emoji == args[3])) {
        if(!data) return message.channel.send("Je n'ai pas pu **trouvé le réaction rôle menu**")
        let index = pog.indexOf(data);
delete pog[index];
var filter = pog.filter((x) => {
return x !== null && x
});
db.set(`reactions_${message.guild.id}_${msg.id}`, filter)
            } else {
                return message.channel.send("Je n'ai pas pu **trouvé le réaction rôle menu**")
            }
        }
        }).catch(e=> { console.log(e), message.channel.send("Je n'ai pas **accès a cet émoji**")})



}
}
