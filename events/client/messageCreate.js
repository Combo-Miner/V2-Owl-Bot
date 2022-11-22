const client = require("../../index");
const dbs = require('quick.db')
const fetch = require("node-fetch");
var config = require("../../config.json");
const colors = require('colors');


client.on("messageCreate", async (message) => {
    if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.channel.send("J'ai besoin des permissions `Administrator` pour fonctionner correctement")
    let prefix = dbs.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = config.prefix
    }
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;
      
                if (message.author.bot) return;
               

                if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;
            
                if (message.mentions.has(`${client.user.id}`) && !message.author.bot) {
                    message.channel.send(`Mon prefix sur ce serveur est ${prefix} `);
                }
            
            
                const [cmd, ...args] = message.content 
                    .slice(prefix.length)
                    .trim()
                    .split(/ +/g);
                const Discord = require('discord.js')
            const db = require("quick.db")
            
                const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()))
                if(!command) return;
          
                
                console.log(message.author.username.brightRed + ` à éxecuté la commande `.brightGreen + prefix + command.name + command.directory    +` dans `.brightGreen + message.guild.name.brightRed + ` (${message.guild.id}) ` )
            
            
                if (command) {  
                    //Permission d'utilisateur
                      console.log(command.directory)
                    let direct = (command).directory

                    if(direct == "perm1") {
                        let perm = false
                        message.member.roles.cache.forEach(role => {
                            
                            if(db.get(`perm1_${message.guild.id}_${role.id}`)) perm = true
                            if(db.get(`perm2_${message.guild.id}_${role.id}`)) perm = true
                            if(db.get(`perm3_${message.guild.id}_${role.id}`)) perm = true
                            if(db.get(`perm4_${message.guild.id}_${role.id}`)) perm = true
                            if(db.get(`perm5_${message.guild.id}_${role.id}`)) perm = true
                            if(db.get(`perm6_${message.guild.id}_${role.id}`)) perm = true
                            if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true
                        })
                        if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id )   {
                         
                        } else return;
                        
                        } else if (direct == "perm2"){
                            let perm = false
                            message.member.roles.cache.forEach(role => {
                                
                                if(db.get(`perm2_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm3_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm4_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm5_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm6_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true
                            })
                            if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id)   {
                             
                            } else return;

                        }else if (direct == "perm3"){
                            let perm = false
                            message.member.roles.cache.forEach(role => {
                                
                                if(db.get(`perm3_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm4_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm5_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm6_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true
                            })
                            if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id)   {
                             
                            } else return;

                        }
                        else if (direct == "perm4"){
                            let perm = false
                            message.member.roles.cache.forEach(role => {
                                
                                if(db.get(`perm4_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm5_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm6_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true
                            })
                            if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id)   {
                             
                            } else return;

                        }
                        else if (direct == "perm5"){
                            let perm = false
                            message.member.roles.cache.forEach(role => {
                                
                                if(db.get(`perm5_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm6_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true
                            })
                            if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id)   {
                             
                            } else return;

                        }
                        else if (direct == "perm6"){
                            let perm = false
                            message.member.roles.cache.forEach(role => {
                                
                                if(db.get(`perm6_${message.guild.id}_${role.id}`)) perm = true
                                if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true

                            })
                            if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id)   {
                             
                            } else return;

                        }
                        else if (direct == "perm7"){
                            let perm = false
                            message.member.roles.cache.forEach(role => {
                                
                                if(db.get(`perm7_${message.guild.id}_${role.id}`)) perm = true
                            })
                            if(   perm == true || db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id)   {
                             
                            } else return;

                        } else if (direct == "Owner") {
                           if( db.get(`owners_${client.user.id}_${message.member.id}`) == true || client.config.ownerID == message.member.id) {

                           }else return;
                            

                        } else if(direct == "public") {
                            if(db.get("channelspub" + message.guild.id) == true) { 
                          if(client.config.ownerID ==message.author.id || db.get(`owners_${client.user.id}_${message.author.id}`) === true || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ){

                          }else return;
                        }
                    }
                   
 
           
            
                    //developpement command
                   
                    //Bot permission
                    if(!message.guild.me.permissions.has(command.BotPerms  ||[])) return message.channel.send(`J'ai besoin de \`${command.BotPerms || []}\`permissions`)
                await command.run(client, message, args, Discord);
            
            
            }

            
           
})
