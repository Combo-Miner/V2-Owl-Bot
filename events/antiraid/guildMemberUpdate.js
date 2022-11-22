
const client = require("../../index");
const db = require("quick.db")
const config = require("../../config.json")
const { MessageEmbed} = require("discord.js")
client.on("guildMemberUpdate", async (oldMember,newMember) => {
    let member = oldMember || newMember
    const guild = member.guild
    const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
    const raidlog =  guild.channels.cache.get(db.get('raid_logs' +guild.id))


       const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => audit.entries.first()) 
       let rolesss = action.changes[0].new?.map(r=> r.id)
       let roles = rolesss.join()
       let role = guild.roles.cache.get(roles)
       let perm = ""
       perm = client.user.id === action.executor.id || guild.ownerId === action.executor.id || db.get(`owners_${client.user.id}_${action.executor.id}`) === true || db.get(`whitelist_${guild.id}_${action.executor.id}`) === true
       if (db.get(`rolesadd_${guild.id}`) === true && !perm) {

           if(role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {

             if (db.get(`rolesaddsanction_${guild.id}`) === "ban") {
               axios({
                   url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${action.executor.id}`,
                   method: 'PUT',
                   headers: {
                       Authorization: `bot ${client.config.token}`
                   },
                   data: {
                       delete_message_days: '1',
                       reason: 'Antirole'
                   }
               }).then(() => {
                                   member.roles.remove(role.id)
                   if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a ajouter des permissions à \`${member.user.tag}\`, il a été **ban** !`)]})
               }
               ).catch(() => {
                                   member.roles.remove(role.id)
                   if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a ajouter des permissions à \`${member.user.tag}\`, mais il n'a pas pu être **ban** !`)]})

               }
               )
           } else if (db.get(`rolesaddsanction_${guild.id}`) === "kick") {
               guild.members.cache.get(action.executor.id).kick().then(() => {
                                   member.roles.remove(role.id)
                   if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a ajouter des permissions à \`${member.user.tag}\`, il a été **kick** !`)]})
               }).catch(() => {
                                   member.roles.remove(role.id)
                   if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a ajouter des permissions à \`${member.user.tag}\`, mais il n'a pas pu être **kick** !`)]})
               })
           } else if (db.get(`rolesaddsanction_${guild.id}`) === "derank") {

               guild.members.cache.get(action.executor.id).roles.set([]).then(() => {

                                   member.roles.remove(role.id)
                   if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a ajouter des permissions à \`${member.user.tag}\`, il a été **derank** !`)]})
               }).catch(() => {
                                   member.roles.remove(role.id)
                   if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a ajouter des permissions à \`${member.user.tag}\`, mais il n'a pas pu être **derank** !`)]})
               })
           }
         }

           
       }
  
   

   })