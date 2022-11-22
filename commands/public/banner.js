const Discord = require('discord.js')
const db = require('quick.db')
const axios= require("axios")

module.exports = {
    name: 'banner',
    helpname  : "banner <name>",
    descritpion : "Permet de voir la bannière d'un utilisateur",
    aliases: [],
    run: async (client, message, args) => {
           const color = (db.get(`color_${message.guild.id}`) == null ? client.config.color : db.get(`color_${message.guild.id}`))
            const member = message.mentions.users.first() || await client.users.fetch(args[0]|| message.member.id)
            
            const bannerUrl = await getUserBannerUrl(member.id,client, { size: 4096 });
      if(bannerUrl) {
      const Embed = new Discord.MessageEmbed()
          Embed.setTitle(`${member.username}`);
          Embed.setImage(`${bannerUrl}`);
        
          Embed.setColor(color)
      message.channel.send({embeds : [Embed]}) 
      } else {
          const Embed = new Discord.MessageEmbed()
          Embed.setTitle(`${member.username}`);
          Embed.setDescription(`N'a aucune bannière`);
        
          Embed.setColor(color)
      message.channel.send({embeds : [Embed]}) 
      
      
    }}
}

async function getUserBannerUrl(userId, client, { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {

    if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
        throw new Error(`The size '${size}' is not supported!`);
    }
  
    
    if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
        throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
    }
  
  
    const user = await client.api.users(userId).get();
    if (!user.banner) return null;
  
    const query = `?size=${size}`;
    const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
  
  
    if (dynamicFormat) {
        const { headers } = await axios.head(baseUrl);
        if (headers && headers.hasOwnProperty("content-type")) {
            return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
        }
    }
  
    return baseUrl + `.${defaultFormat}` + query;
  
  }