const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const db = require('quick.db');
const config = require("../../config.json")
const {promisify} = require('util');
const {readdirSync} = require("fs")
const { glob } = require("glob");
const fs = require('fs')

const globPromise = promisify(glob);

module.exports = {
    name: "change",
    helpname : "change <commande> <perm>",
    description: "*Permet d'ajouter un owner*",
    ownerOnly: true,
    emoji: '🔱',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        if(!args[0]) return message.channel.send("Vous devez **spécifié une commmande**")

        const cmd = client.commands.get(args[0])
        if(!cmd)return message.channel.send(`Aucune commande trouvé pour \`${args[0]}\``)
        let dirs = args[1]
        if(!dirs) return message.channel.send("Vous n'avez pas spécifié de permissions")

                       
           
                let file = (`${process.cwd()}/commands/${cmd.directory}/${cmd.name}.js`); 
               let ez = ""
               if(dirs == "perm1"){
                ez = (process.cwd() + "/commands/perm1/" )

               } else if(dirs == "perm2") {
                ez = (process.cwd() + "/commands/perm2/"  )

               }
               else if(dirs == "perm3") {
                ez = (process.cwd() + "/commands/perm3/" )

               } else if(dirs == "perm4") {
                ez = (process.cwd() + "/commands/perm4/")

               } else if(dirs == "perm5") {
                ez = (process.cwd() + "/commands/perm5/")

               } else if(dirs == "perm6") {
                ez = (process.cwd() + "/commands/perm6/" )

               } else if(dirs == "perm7") {
                ez = (process.cwd() + "/commands/perm7/" )

               }else if(dirs == "public") {
                ez = (process.cwd() + "/commands/public/")

               }else if (dirs == "owner") { 
               ez = (process.cwd() + "/commands/Owner/")

              }else {
                return message.channel.send("Cette **perm n'existe pas**")
               }

               if(file == ez +cmd.name + ".js") return message.channel.send("Vous ne pouvez pas **déplacé une commande dans la meme directoire**")
           
           

                const fs = require('fs-extra');

             fs.move( `${file}`, ez + cmd.name + ".js", err => {
                if(err) return console.error(err);
            message.channel.send(`${(cmd.name)} est **désormais ${args[1]}**`);
               })
           


            
            

        
       
  
        
}
}