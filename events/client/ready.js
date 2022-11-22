const client = require("../../index");
const ms = require('ms')
const osUtils = require("os-utils");
const bot = require("../../models/mybot")




client.on("ready", async() => { 
    console.log(`${client.user.tag} est maiteanant en ligne!`)
    let allcount = client.commands.size + client.slashCommands.size
    console.log(`Je suis dans ${client.guilds.cache.size} serveurs on se rapproche bientôt de la vérification YAYY ^^ `)
    console.log(`J'ai un total de ${client.commands.size} commandes et ${client.slashCommands.size} SlashCommandes donc au total ${allcount} `)
    let servers = await client.guilds.cache.size
    let servercount  = await client.guilds.cache.reduce((a,b) => a+b.memberCount,0)

    setInterval(()=>{
    bot.findOne({
      BotId: client.user.id,
  }, async (err, data) => {
     
      if (err) throw err;
      if (!data) {
          console.log("J'appartient à personne x(")
          client.destroy()
      } else {
        const e = data.content.map(
             (w, i) => {
               let botid = w.botid == client.user.id
               let nowtime =  new Date(Date.now()).getTime()
               if(botid == true ) {
               let time =  `${(Math.round((new Date(w.time).getTime() - new Date(nowtime).getTime()) /(1000*3600*24)))}`
               if(time == 0) {
                console.log("Je m'eteins")
                client.destroy()
               }
               }
        })
      }
  

      })
    }  ,10000)
      })

   
  




