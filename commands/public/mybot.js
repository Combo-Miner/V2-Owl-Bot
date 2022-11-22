const  { map } =  require('modern-async')


const {MessageEmbed,Message,Client} = require('discord.js')
const db = require("quick.db");
const bot = require("../../models/mybot")
module.exports = {

            name: 'mybot',
            helpname : "mybot",
            description: 'Permet de voir le temps restant de son abonnement',
         
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * 
     */
    run: async (client, message,args) =>  {
        let member = message.mentions.members.first() || message.author
          let nowtime =  new Date(Date.now()).getTime()
          let user = member
          bot.findOne({
            User : member.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = await map(data.content,
                  async   (w, i) => 
                        `${i + 1}) [${( (await client.users.fetch(w.botid)).username)}](https://discord.com/api/oauth2/authorize?client_id=` + (w.botid) + `&permissions=8&scope=bot%20applications.commands) :  ${(Math.round((new Date(w.time).getTime() - new Date(nowtime).getTime()) /(1000*3600*24))) >=1 ? `${(Math.round((new Date(w.time).getTime() - new Date(nowtime).getTime()) /(1000*3600*24)))} jours restants` : "Expiré"} `
                )
                
                const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
                let prefix = db.get(`prefix_${message.guild.id}`)
                if(!prefix) {
                    prefix = client.config.prefix
                }
                const embed = new MessageEmbed()
                    .setDescription(e.join("\n"))
                    .setColor(color)
                    .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
                    
                message.channel.send({
                    embeds: [embed]
                })
            } else {
                message.channel.send({embeds : [ new MessageEmbed().setAuthor({ name: user.user.username, iconURL: user.displayAvatarURL() }).setTitle("Vous n'avez aucun bot")]})
            }
        })
      
       // console.log(Math.round(differencedays))
        
   
       
       
}
};