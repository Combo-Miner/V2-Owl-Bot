const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const db = require("quick.db")

module.exports = {
    name : 'tempmute',
    helpname : "tempmute <membre> <temps>",
    description: "Permet de temporairement mute un utilisateur",
    emoji: '🤫',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }  
        const   member = message.mentions.members.first()
        if(member.user.bot) return;
        if(member.permissions.has("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas mute **cet utilisateur.**")
if(!member) {
    return message.reply(`Aucun utilisateur trouvé pour ${args[0]}`)}
let role = message.guild.roles.cache.find(role => role.name === 'Muted')
if(!role)return;
let time  = args[1];
if(!time){
    return message.reply("Temps incorrect")}
await member.roles.add(role);
const  random_string = require("randomstring")
   let    user = member 
        let res = args.slice(2).join(" ")
        if(!res) res = "Aucune raison" 
   
   let warnID = await
   random_string.generate({
       charset: 'numeric',
       length: 4
   });
   
   db.add(`number.${message.guild.id}.${user.id}`,1)
   db.push(`info.${message.guild.id}.${user.id}`, { id: warnID   ,type : "temp-mute",moderator: message.author.tag, reason: res, date: Date.parse(new Date) / 1000 })
 
   

if(member.roles.cache.has(role)) return message.channel.send(`${member.displayName} est déjà mute.`)
message.channel.send(`<@${member.user.id}> est mainteanant **tempmute**`)
let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))

if(logs) {
    logs.send({embeds : [new MessageEmbed()
        .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
        .setDescription(`${message.author.username}** à retirer la permissions de parler à  ${user}** pendant ${time}`).setColor(color)
        .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
        
    
    ]})
    }
setTimeout(function(){
    member.roles.remove(role.id);
       message.channel.send({content : `${member} à retrouvé la parole`})
       let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
       if(logs) {
           logs.send({embeds : [new MessageEmbed()
               .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
               .setDescription(`${user} à **retrouvé la parole**`).setColor(color)
               .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
               
           
           ]})
           }
    }, ms(time))
    }
}