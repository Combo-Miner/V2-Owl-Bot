const {Message,Client} = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'massrole',
    helpname : "massrole [add/remove] <rôle> ",
    description : "Permet d'ajouter/enlevé un rôle à tous les utilisateur",
    aliases: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

            if (args[0] === "add") {
                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)
             let count = 0
                message.channel.send(`Je vais ajouter le rôle ${role} à ${message.guild.memberCount} utilisateurs.`)
                message.guild.members.cache.forEach(member => setInterval(() => {
                   count++
                    if (member) member.roles.add(role, `Masiverole par ${message.author.tag}`).catch()
                    if(count === message.guild.memberCount)  return message.channel.send(`1 rôle ajouté à ${message.guild.memberCount} ${message.guild.memberCount > 1 ? 'membres' : 'membre'}`);
                }), 250)
            

            } else if (args[0] === "remove") {
                let count = 0
                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)

                message.channel.send(`Je vais enlevé le rôle ${role} à ${message.guild.memberCount} utilisateurs.`)
                message.guild.members.cache.forEach(member => setInterval(() => {
                    count++
                    if (member) member.roles.remove(role, `Masiverole par ${message.author.tag}`).catch()
                    if(count === message.guild.memberCount)  return message.channel.send(`1 rôle enlevé à ${message.guild.memberCount} ${message.guild.memberCount > 1 ? 'membres' : 'membre'}`);

                }), 250);

            }
        

    }
}