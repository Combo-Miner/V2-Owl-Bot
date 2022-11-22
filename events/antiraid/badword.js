const client = require("../../index")
const db = require("quick.db")
client.on("messageCreate", async (message)=> {
    if(message.member.user.bot)return;
   let arsr = message.content.split(" ").forEach(w=> {
    let ez = db.get(`badword_${message.guild.id}_${w}`) 
if(ez == true) {
    message.delete().then(()=> message.channel.send(`${message.member} vous utilisé des mots interdit`)).catch(e=> {return;})
}})



        

})