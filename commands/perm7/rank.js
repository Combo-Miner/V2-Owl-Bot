const { MessageEmbed,Message,Client,MessageSelectMenu,MessageButton,MessageActionRow } = require('discord.js')
const color = 'BLUE'
const db = require("quick.db")
const RankSchema=require("../../models/ranks");

module.exports = {
            name: 'rank',
            helpname : "rank <membre> <nom> ",
            description: 'Permet de configurer les ranks ou de rank un utilisateur',
            UserPerms: ['ADMINISTRATOR'],
            
 /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
        
    
    run: async(client, message,args)  => { 
        let guild = message.guild
        const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
        if(!args[0]) {
            //   function updateem(msg)  {
                   let menuoptions = [
                       {value : "Ajouter un nouveau rank",description : "",emoji : "➕"},
                       {value : "Supprimer un rank",description : "",emoji : "➖"},
   
   
                   ]
                   let embed = new MessageEmbed()
                   .setTitle("Nouveau rank")
                   .addField("Nom : ","Aucun")
                   .addField("Rôle : ","Aucun")
                   .setColor(color)
                   let butt = new MessageButton()
                   .setCustomId("list")
                   .setEmoji("📜")
                   .setLabel("Liste")
                   .setStyle("PRIMARY");
                   let butt2 =  new MessageButton()
                   .setStyle("PRIMARY")
                   .setCustomId("boostid")
                   .setEmoji("❌")
                   .setLabel("Re formuler votre choix");
                   let menu = new MessageSelectMenu()
                   .setCustomId(message.id + "ranks")
                   .setPlaceholder("Faix un choix")
                   .setMaxValues(1)
                   .addOptions(menuoptions.map(options => ({
                       label : options.value,
                       value : options.value,
                       emoji : options.emoji
                   })));
               
              let select = new MessageActionRow()
              .addComponents(menu)
              let buttons = new MessageActionRow()
              .addComponents(butt,butt2)
              message.channel.send({embeds : [embed], components : [select,buttons]})

              client.on('interactionCreate',async (i)=> {
                if(!i.isSelectMenu()) return ;
                let filter = (m) => m.author.id == message.author.id
                if(i.user.id !== message.author.id) return i.reply({content : "Tu n'est pas autorisé à utilisé cette interaction",ephemeral : true})
                switch(i.values[0])  {
    
                    case "Ajouter un nouveau rank":
                        i.deferUpdate()
                    let ez =   await  message.channel.send("Quel doit être **le rôle à donné ?** ")
                       await  message.channel.awaitMessages({
                            filter,
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected) => {
                            const lowercase = collected.first()
                            let channel = lowercase.mentions.roles.first()
                            if(!channel) return message.channel.send(`Aucun rôle trouvé pour \`${lowercase}\``)
                            ez.delete()
                            collected.first().delete()
                           
                         
                           
                            
                         let msg =   await  message.channel.send("Quel doit être **le nom du rank ?**")
                           await  message.channel.awaitMessages({
                                filter,
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async (collected) => {
                                const lowercase = collected.first()
                                let role = lowercase.content
                                collected.first().delete()
                                msg.delete()
    
                            let e =    i.message.edit({embeds : [new MessageEmbed().setTitle("Nouveau rank")
                                .addField("Nom : ", `${role}`)
                                .addField("Rôle : ", `<@&${channel.id}>`)]})
                                   
                                RankSchema.findOne(
                                    {Guild:message.guild.id,Rank:role},
                                    async(err,data)=>{
                                      if(data)return message.channel.send("Il semble que ce rôle existe déjà");
                                      else{
                                          data= new RankSchema({
                                              Guild:message.guild.id,
                                              Rank:role,
                                              Role:channel.id,
                                            }).save()
                                    }
                                    }
                                   
                                  );                                             
                                   
    
                               
                               
                                })
                            })
                                
                        break;
                        case "Supprimer un rank":
                            i.deferUpdate()
                            let ezs =   await  message.channel.send("Quel doit être **le rank a supprimé(nom) ?** ")
                            await  message.channel.awaitMessages({
                                 filter,
                                 max: 1,
                                 time: 60000,
                                 errors: ['time']
                             }).then(async (collected) => {
                                 const lowercase = collected.first()
                                 let channel = lowercase.content
                                 RankSchema.findOne(
                                    {Guild:message.guild.id,Rank:channel},
                                    async(err,data)=>{
                                      if(!data)return message.reply(`Aucun rank trouvé pour \`${channel ? "Rien" :channel}\``);
                                     await  message.channel.send(`${channel} a été supprimé`)
                                      data.delete()
                                  }
                                  );
                                 ezs.delete()
                                 collected.first().delete()
                           })     

                     
                        
                }
               })
               client.on("interactionCreate", async (i)=> {
                if(!i.isButton()) return ;
                if(i.user.id !== message.author.id) return i.reply({content : "Tu n'est pas autorisé à utilisé cette interaction",ephemeral : true})
                if(i.customId == "boostid") {
                    i.deferUpdate()
                 
                } 
                if(i.customId == "list") { 
                RankSchema.find({Guild:message.guild.id},async(err,data)=>{
                    if(!data) {
                        i.deferUpdate()
                        return message.reply("Aucun rank est **configuré sur ce serveur**");}
                    i.update({embeds: [
                      new MessageEmbed().setColor(color).setDescription(
                        data.map(({Rank,Role},index)=>{
                            return `${index+1}. **${Rank}** ${message.guild.roles.cache.get(Role)} `
                          })
                          .join("\n")
                     
                          )]})
                  });
                }
            })
            
            
    
            
    



        } else {
            console.log("oui")
    const member = message.mentions.members.first() || message.guild.members.cache.find(m=> m.user.username == args[0])
    if(!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0]}\``)
    const rankName = args.slice(1).join(" ");
    console.log(rankName)
    if(!rankName)return message.channel.send(`Aucun rank trouvé pour \`${args.join("") ? "Rien" : args.join("")}\``);
    RankSchema.findOne(
      {Guild:message.guild.id,Rank:rankName},
      async(err,data)=>{
        if(!data)return message.reply(`Aucun rank trouvé pour \`${args.join("") ? "Rien" : args.join("")}\``);
        member.roles.add(data.Role);
        return message.channel.send(`${member} a **été rank ${rankName} **`);
    }
    );
       }

          
    }
}