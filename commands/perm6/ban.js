const { Message, Client, MessageEmbed, ButtonInteraction } = require("discord.js");
const { user } = require("../..");


module.exports = {
    name: "ban",
    helpname : "ban <membre>",
    description: 'Permet de ban un utilisateur',
    emoji: '🚫',

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args,Discord) => {

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Aucune raison";
    const target = message.mentions.members.first()

    if (!target) return;

    if (target.id === message.author.id) return;
    if(target.roles.highest.position >= message.member.roles.highest.position ) return;
    
    if (target.id ===  client.user.id ) {
         message.reply(
          `Je ne peux pas me ban`
        );
      }
    if (target.id === message.guild.ownerId) return;
   if(target.bannable) { 
      const  random_string = require("randomstring")
      let res = reason
            let warnID = await
            random_string.generate({
                charset: 'numeric',
                length: 4
            });
            
            db.add(`number.${message.guild.id}.${user.id}`,1)
            db.push(`info.${message.guild.id}.${user.id}`, { id: warnID   ,type : "bannissement",moderator: message.author.tag, reason: res, date: Date.parse(new Date) / 1000 })

  
  

    await message.guild.bans.create(target, {
      reason: reason
      
    }) .then(() => {
      const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
      let prefix = db.get(`prefix_${message.guild.id}`)
      if(!prefix) {
          prefix = client.config.prefix
      }
      
        message.channel.send({ content : `${target} vien de se faire **bannir**` })
        let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
        if(logs) {
          logs.send({embeds : [new MessageEmbed()
              .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
              .setDescription(`${message.member.user.username} a **ban ${user.username} **`)
              .setColor(color)
      .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)

              
          
          ]})
          }
        
      });
    } else {
      return  message.reply(`Assurez-vous que mon **rôle est assez haut**`) }}
};