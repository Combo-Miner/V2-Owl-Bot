const client = require("../../index");
const config = require("../../config.json")
const { MessageEmbed, Message} = require("discord.js")
const axios= require("axios")
const db = require("quick.db")
const ms = require("ms")
client.on("guildMemberAdd",async  (member) => {
  let guild = member.guild
  const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
  
  const raidlog =  guild.channels.cache.get(db.get('raid_logs' +guild.id))
  if(db.get(`blacklist_${client.user.id}_${member.id}`) == true ){
    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`${member} à rejoint alors qu'il est blacklist,je l'ai ban`)]})
  }
  if (db.get(`crealimit_${member.guild.id}`) === true) {
    const duration = ms(db.get(`crealimittemps_${member.guild.id}`) || "0s");
    let created = member.user.createdTimestamp;
    let sum = created + duration;
    let diff = Date.now() - sum;

    if (diff < 0) {

        member.kick()
    }
    const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`${member} à été **kick** parce que \`sont compte à été crée trop récemment\``)
    if (raidlog) raidlog.send({embeds : [embed]})
}
  if (member.user.bot) {
    const action = await guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first())
    if ( action.executor.id) {
        let perm = ""
              perm = client.user.id === action.executor.id || guild.ownerId === action.executor.id || db.get(`owners_${client.user.id}_${action.executor.id}`) === true || db.get(`whitelist_${guild.id}_${action.executor.id}`) === true
        if (db.get(`bot_${guild.id}`) === true && !perm) {
           
           
            if (db.get(`botsanction_${guild.id}`) === "ban") {
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
                
                    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, il a été **ban** !`)]})
                    guild.members.cache.get(member.id).ban()
                }
                ).catch(() => {

                    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, mais il n'a pas pu être **ban** !`)]})
                    guild.members.cache.get(member.id).ban()

                }
                )
            } else if (db.get(`botsanction_${guild.id}`) === "kick") {
                guild.members.cache.get(action.executor.id).kick().then(() => {

                    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, il a été **kick** !`)]})
                    guild.members.cache.get(member.id).kick()
                }).catch(() => {

                    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, mais il n'a pas pu être **kick** !`)]})
                    guild.members.cache.get(member.id).kick()
                })
            } else if (db.get(`botsanction_${guild.id}`) === "derank") {

                guild.users.cache.get(action.executor.id).roles.set([]).then(() => {


                    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, il a été **derank** !`)]})
                    
                    guild.members.cache.get(member.id).kick()
                }).catch(() => {

                    if (raidlog) return raidlog.send({embeds : [new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, mais il n'a pas pu être **derank** !`)]})
                    guild.members.cache.get(member.id).kick()
                })
            }

        }
    }
    }})