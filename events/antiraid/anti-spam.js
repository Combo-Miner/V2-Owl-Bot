const { MessageEmbed } = require('discord.js'); 
const client = require('../../index');
const db = require('quick.db');
const internal = require('stream');
const usersMap = new Map();
const LIMIT = 5;
const DIFF = 5000;

client.on('messageCreate', async (message) => {
    const antispam = db.get(`antispam_${message.guild}`)

   

    if(antispam === 'enabled') {
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id)
            }, 5000);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                
                message.author.send({ content: `Ton **(${LIMIT})** message à été delete et tu as été ban de  **${message.guild}** pour spam` });
                message.channel.bulkDelete(LIMIT);
                 await message.guild.bans.create(message.author.id, {

      reason: "Spam"



})
               
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
        }
        else {
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, 5000);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage : message,
                timer : fn
            });
        } if(message.mentions.users.size > 3) {
            msg.delete()
            message.author.send({ content: `Ton message à été supprimé dans  **${message.guild}** et tu à été ban pour *Spam de Mention*`})
            await message.guild.members.fetch(message.author.id).kick({reason: 'Spam Mentions'});
           }

        }
    })
