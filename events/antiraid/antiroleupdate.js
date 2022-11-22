const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const client = require("../../index")
client.on("roleUpdate", async ( oldRole, newRole) => {
    console.log(oldRole.name)
    const guild = oldRole.guild
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
   const arabe= await guild.fetchAuditLogs({ limit: 1, type: "ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
 if( arabe.executor.id) {
    let action = arabe

   let perm = ""
   perm = client.user.id === action.executor.id || guild.ownerId === action.executor.id || db.get(`owners_${client.user.id}_${action.executor.id}`) === true || db.get(`whitelist_${guild.id}_${action.executor.id}`) === true
   if (db.get(`rolesmod_${guild.id}`) === true && !perm) {
    console.log(newRole.name)

    const raidlog =  guild.channels.cache.get(db.get('raid_logs' +guild.id))
 
       if (db.get(`rolesmodsanction_${guild.id}`) === "ban") {
                 
 
           axios({
               url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${arabe.executor.id }`,
               method: 'PUT',
               headers: {
                   Authorization: `bot ${client.config.token}`
               },
               data: {
                   delete_message_days: '1',
                   reason: 'Antirole'
               }
            }).then(() => {
           newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                 //  highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
              if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, il a été **ban** !`)]})
           }
            ).catch(() => {
           newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
               //    highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
                if (raidlog) return raidlog.send({embeds :[new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, mais il n'a pas pu être **ban** !`)]})
 
           }
           )
   } else if (db.get(`rolesmodsanction_${guild.id}`) === "kick") {
       guild.members.cache.get(arabe.executor.id).kick().then(() => {
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                 //  highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
           if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, il a été **kick** !`)]})
       }).catch(() => {
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                 //  highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
            if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, mais il n'a pas pu être **kick** !`)]})
       })
   } else if (db.get(`rolesmodsanction_${guild.id}`) === "derank") {
 
       guild.members.cache.get(arabe.executor.id ).roles.set([]).then(() => {
 
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
               //    highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
           if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, il a été **derank** !`)]})
       }).catch(() => {
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.position,
                   reason: `Antirole`
               }
 
           })
       if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, mais il n'a pas pu être **derank** !`)]})
       })
   }
   
 
 }
     
 
   }


})