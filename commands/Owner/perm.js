const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'perm',
    aliases: [],
    helpname : "perm set <perm> <rôle> ",
    description : "Permet de configurer les perms du bot",
    ownerOnly : true,
    run: async (client, message, args) => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }  
        if (args[0] === "set") {
           
                if (args[1].toLowerCase() === "perm1") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm1_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 1`)
                    db.set(`perm1_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                } else if (args[1].toLowerCase() === "perm2") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm2_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 2 `)
                    db.set(`perm2_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                } else if (args[1].toLowerCase() === "perm3") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm3_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 3 `)
                    db.set(`perm3_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }
                else if (args[1].toLowerCase() === "perm4") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm4_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 4`)
                    db.set(`perm4_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }else if (args[1].toLowerCase() === "perm5") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm5_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 5`)
                    db.set(`perm5_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }
                else if (args[1].toLowerCase() === "perm6") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm6_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 6`)
                    db.set(`perm6_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }
                else if (args[1].toLowerCase() === "perm7") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`perm7_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la perm 7`)
                    db.set(`perm7_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }
            
        } else if (args[0] === "del") {
            

            if (args[1].toLowerCase() === "perm1") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (db.get(`perm1_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm1_${message.guild.id}_${role.id}`)
                message.react("✅")
            } else if (args[1].toLowerCase() === "perm2") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (db.get(`perm2_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm2_${message.guild.id}_${role.id}`)
                message.react("✅")
            } else if (args[1].toLowerCase() === "perm3") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (db.get(`perm3_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm3_${message.guild.id}_${role.id}`)
                message.react("✅")
            }
            else if (args[1].toLowerCase() === "perm4") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (db.get(`perm4_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm4_${message.guild.id}_${role.id}`)
                message.react("✅")
            }else if (args[1].toLowerCase() === "perm5") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (db.get(`perm5_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm5_${message.guild.id}_${role.id}`)
                message.react("✅")
            }
            else if (args[1].toLowerCase() === "perm6") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (!db.get(`perm6_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm6_${message.guild.id}_${role.id}`)
                message.react("✅")
            }
            else if (args[1].toLowerCase() === "perm7") {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                if (db.get(`perm7_${message.guild.id}_${role.id}`)) return message.channel.send(`Cette perm ne possédes pas le rôle ${role}`)
                db.delete(`perm7_${message.guild.id}_${role.id}`)
                message.react("✅")
            }
            
        } else if (args[0] === "clear") {
            let modsc = await db.all().filter(data => data.ID.startsWith(`perm1_${message.guild.id}`));
            let modssc = 0;
            for (let i = 0; i < modsc.length; i++) {
                db.delete(modsc[i].ID);
                modssc++;
            }
            let adminc = await db.all().filter(data => data.ID.startsWith(`perm2_${message.guild.id}`));
            let adminsc = 0;
            for (let i = 0; i < adminc.length; i++) {
                db.delete(adminc[i].ID);
                adminsc++;
            }
            let ownerc = await db.all().filter(data => data.ID.startsWith(`perm3_${message.guild.id}`));
            let ownersc = 0;
            for (let i = 0; i < ownerc.length; i++) {
                db.delete(ownerc[i].ID);
                ownersc++;
            }
            let gvwc = await db.all().filter(data => data.ID.startsWith(`perm4_${message.guild.id}`));
            let gvwsc = 0;
            for (let i = 0; i < gvwc.length; i++) {
                db.delete(gvwc[i].ID);
                gvwsc++;
            }

            let perm = await db.all().filter(data => data.ID.startsWith(`perm5_${message.guild.id}`));
            let perm5 = 0;
            for (let i = 0; i < perm.length; i++) {
                db.delete(perm[i].ID);
                perm5++;
            }

            let perm1 = await db.all().filter(data => data.ID.startsWith(`perm6_${message.guild.id}`));
            let perm6 = 0;
            for (let i = 0; i < perm1.length; i++) {
                db.delete(perm1[i].ID);
                perm6++;
            }
            let perm2 = await db.all().filter(data => data.ID.startsWith(`perm7_${message.guild.id}`));
            let perm7 = 0;
            for (let i = 0; i < perm2.length; i++) {
                db.delete(perm2[i].ID);
                perm7++;
            }
            message.react("✅")
        }

    }
}