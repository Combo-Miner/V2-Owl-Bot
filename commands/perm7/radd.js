

const Discord = require('discord.js')
const db = require('quick.db')



module.exports = {
    name: 'radd',
    aliases: ["reactionadd"],
    description : "Permet d'ajouter une réaction à rôles",
    helpname : "radd <salon> <ID> <emoji>",
    run: async (client, message, args,) => {

let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
if (!channel) return message.channel.send(`Aucun salon trouvé pour \`${args[0] ? "rien" : args[0]}\``);
let msg = await channel.messages.fetch(args[1]);
if (!msg) return message.channel.send(`Aucun message trouvé pour \`${args[1]}\``);
let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``);
message.react(args[3]).then(async()=> {
    let pog = db.get(`reactions_${message.guild.id}_${msg.id}`)
if (pog && pog.find((x) => x.emoji == args[3])) {
            return message.channel.send({
              content : "Cet émoji est déjà utilisé dans le message"
            });
        }
await msg.react(args[3])
db.push(`reactions_${message.guild.id}_${msg.id}`, {
emoji: args[3],
roleId: role.id
})
}).catch(e=> {message.channel.send("Je n'ai pas **accès a cet émoji**")})

}
}