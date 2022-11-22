

const client = require("../../index");
const db = require("quick.db")
const {MessageEmbed} = require("discord.js")
const config = require("../../config.json")
const axios = require("axios")
const ms = require("ms")
client.on("guildBanAdd", async (member) => {                    
  let kick = 0
    let kickLimit = db.get(`massbannum_${member.guild.id}`) || 2
    setInterval(() => {
        kick = 0
    }, ms(db.get(`massbantime_${member.guild.id}`) || "10s"));
    const guild = member.guild
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)

   const raidlog =  guild.channels.cache.get(db.get('raid_logs' +guild.id))

    const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first()) 

    if ( action.executor.id) {
     
        let perm = ""
        perm = client.user.id === action.executor.id || guild.ownerId === action.executor.id || db.get(`owners_${client.user.id}_${action.executor.id}`) === true || db.get(`whitelist_${guild.id}_${action.executor.id}`) === true
        if (db.get(`massban_${guild.id}`) === true && !perm) {
            if (kick <= kickLimit) {
                kick++
            } else {
                kick++
                if (db.get(`massbansanction_${guild.id}`) === "ban") {
                    axios({
                        url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${action.executor.id}`,
                        method: 'PUT',
                        headers: {
                            Authorization: `bot ${client.config.token}`
                        },
                        data: {
                            delete_message_days: '1',
                            reason: 'Antiban'
                        }
                    }).then(() => {
                        
                        if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}>a ban${member}, il a été **ban** !`)]})
                    }
                    ).catch(() => {
                        
                        if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}>a ban${member}, mais il n'a pas pu être **ban** !`)]})

                    }
                    )
                } else if (db.get(`massbansanction_${guild.id}`) === "kick") {
                    guild.members.cache.get(action.executor.id).kick().then(() => {
                        
                        if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}>a ban${member}, il a été **kick** !`)]})
                    }).catch(() => {
                        
                        if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}>a ban${member}, mais il n'a pas pu être **kick** !`)]})
                    })
                } else if (db.get(`massbansanction_${guild.id}`) === "derank") {

                    guild.members.cache.get(action.executor.id).roles.set([]).then(() => {

                        
                        if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}>a ban${member}, il a été **derank** !`)]})
                    }).catch(() => {
                        
                        if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}>a ban${member}, mais il n'a pas pu être **derank** !`)]})
                    })
                }
            }

        }

    }
})


