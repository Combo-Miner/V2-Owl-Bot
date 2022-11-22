const client = require("../../index");
const db = require("quick.db")
const config = require('../../config.json');
const { MessageEmbed } = require("discord.js");

client.on('guildMemberBoost', async(member) =>{
   
        const embed = db.get(`boostembed_${member.guild.id}`)
        let  loogs =  client.channels.cache.get(db.get(`boost_${member.guild.id}`))
        const channel = client.channels.cache.get(db.get("boostchannel_" + member.guild.id))
        let tier = member.guild.premiumTier
         if(tier === "TIER_1" ) tier = 1
        else if(tier === 'TIER_2') tier = 2
        else if(tier === 'TIER_3') tier = 3
        else tier = 0   
if(channel) { 
   if(embed) {
    let embedj = db.get(`boostembed_${member.guild.id}`)
if(!embedj.description) {} else {embedj.description = embedj.description.replace("{user}", member.user).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boost:number}", member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name)}
if(!embedj.title) { } else {embedj.title = embedj.title.replace("{user}", `<${member.user.id}>`).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boost:number}", member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name)}
if(!embedj.footer) {} else {embedj.footer.text = embedj.footer.text.replace("{user}", `<${member.user.id}>`).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boostlevel}", tier).replace("{boost:number}", member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{boost:number}",  member.guild.premiumSubscriptionCount).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name)}
channel.send({embeds : [embedj]})
if(loogs){
 await loogs.send({embeds : [new MessageEmbed().setDescription(`${member} vient de boost le serveur`).setColor("#ff007f")]})
}

   }
}     
         })