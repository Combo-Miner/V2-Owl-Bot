const client = require("../../index");
const config = require('../../config.json')
const db = require("quick.db")
const random_string = require("randomstring")
client.on("messageCreate", async (message , args) => {
  const guild = message.guild
  let perm = ""
  perm = client.user.id === message.author.id || guild.ownerId === message.author.id || client.config.owner == (message.author.id) || db.get(`owners_${client.user.id}_${message.author.id}`) === true || db.get(`whitelist_${guild.id}_${message.author.id}`) === true
  if (db.get(`link_${guild.id}`) === true && !perm) {
    const db = require("quick.db")
    const Discord = require("discord.js");


    const pub = [
     "discord.me",
     "discord.com",
     "discord.io",
     "discord.gg",
     "invite.me",
     "discord.gg/",
     "discord.",
     "discordapp.com/invite",
     ".gg",
     "https",
      "http",
      "https:"

 ];
  

    if (pub.some(word => message.content.includes(word))) {
        db.add("warn." + message.author.id,1)
        message.delete().then(() => {
            let warnID =  random_string.generate({
                charset: 'numeric',
                length: 4
            });



        db.push(`info.${message.guild.id}.${message.author.id}`, { Type : "warn", moderator: `${client.user.username}`, reason: "Message Contenant un lien", date: Date.parse(new Date) / 1000, id: warnID })
        db.add(`number.${message.guild.id}.${message.author.id}`, 1)
            return message.channel.send(`${message.author} vous n'avez pas l'autorisation d'envoyer des liens ici`);
        })
        if(db.get("warn." + message.author.id) == 5){
        await   message.member.kick().catch(e => { })
        } else if (db.get("warn." + message.author.id) >=10) {
          await message.member.kick().catch(e => { })
        }
        setInterval(async () => {
          db.delete(`warn_${message.author.id}`)

      }, 60 * 60000);

                 

    }
   
  }
    
  })