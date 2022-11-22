const client = require("../../index");
const db = require("quick.db")
const config = require('../../config.json')
const { MessageEmbed} = require("discord.js")
const axios = require("axios")
client.on("roleDelete", async (role) => {                    
 const guild = role.guild
 const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)



      // -- Audit Logs
      axios.get(`https://discord.com/api/v9/guilds/${guild.id}/audit-logs?ilimit=1&action_type=32`, {
          headers: {
              Authorization: `Bot ${client.config.token}`
          }
      }).then(response => {
        const raidlog =  guild.channels.cache.get(db.get('raid_logs' +guild.id))
          if (response.data && response.data.audit_log_entries[0].user_id) {
            let perm = ""
            perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.ownerId === response.data.audit_log_entries[0].user_id || db.get(`owners_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true || db.get(`whitelist_${guild.id}_${response.data.audit_log_entries[0].user_id}`) === true
              if (db.get(`rolesdel_${guild.id}`) === true && !perm) {
                  if (db.get(`rolesdelsanction_${guild.id}`) === "ban") {
                    

                      axios({
                          url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${response.data.audit_log_entries[0].user_id}`,
                          method: 'PUT',
                          headers: {
                              Authorization: `bot ${client.config.token}`
                          },
                          data: {
                              delete_message_days: '1',
                              reason: 'Antirole'
                          }
                       }).then(() => {
                      role.guild.roles.create({
                          data: {
                              name: role.name,
                              color: role.hexColor,
                              permissions: role.permissions,
                              hoist: role.hoist,
                              mentionable: role.mentionable,
                              position: role.rawPosition,
                            
                              reason: `Antirole`
                          }
          
                      })
                          if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le rôle \`${role.name}\`, il a été **ban** !`)]})
                      }
                       ).catch(() => {
                      role.guild.roles.create({
                          data: {
                              name: role.name,
                              color: role.hexColor,
                              permissions: role.permissions,
                              hoist: role.hoist,
                              mentionable: role.mentionable,
                              position: role.rawPosition,
                             
                              reason: `Antirole`
                          }
          
                      })
                          if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le rôle \`${role.name}\`, mais il n'a pas pu être **ban** !`)]})
    
                      }
                      )
              } else if (db.get(`rolesdelsanction_${guild.id}`) === "kick") {
                  guild.members.cache.get(response.data.audit_log_entries[0].user_id).kick().then(() => {
                  role.guild.roles.create({
                          data: {
                              name: role.name,
                              color: role.hexColor,
                              permissions: role.permissions,
                              hoist: role.hoist,
                              mentionable: role.mentionable,
                              position: role.rawPosition,
                         
                              reason: `Antirole`
                          }
          
                      })
                      if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le rôle \`${role.name}\`, il a été **kick** !`)]})
                  }).catch(() => {
                  role.guild.roles.create({
                          data: {
                              name: role.name,
                              color: role.hexColor,
                              permissions: role.permissions,
                              hoist: role.hoist,
                              mentionable: role.mentionable,
                              position: role.rawPosition,
                           
                              reason: `Antirole`
                          }
          
                      })
                      if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le rôle \`${role.name}\`, mais il n'a pas pu être **kick** !`)]})
                  })
              } else if (db.get(`rolesdelsanction_${guild.id}`) === "derank") {

                  guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {

                  role.guild.roles.create({
                          data: {
                              name: role.name,
                              color: role.hexColor,
                              permissions: role.permissions,
                              hoist: role.hoist,
                              mentionable: role.mentionable,
                              position: role.rawPosition,
                          
                              reason: `Antirole`
                          }
          
                      })
                      if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le rôle \`${role.name}\`, il a été **derank** !`)]})
                  }).catch(() => {
                  role.guild.roles.create({
                          data: {
                              name: role.name,
                              color: role.hexColor,
                              permissions: role.permissions,
                              hoist: role.hoist,
                              mentionable: role.mentionable,
                              position: role.rawPosition,
                            
                              reason: `Antirole`
                          }
          
                      })
                      if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le rôle \`${role.name}\`, mais il n'a pas pu être **derank** !`)]})
                  })
              }
          
        
              }
          
        }

      });

  
})