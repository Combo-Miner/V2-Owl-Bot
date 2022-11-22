const { Client,
    Message,
    MessageEmbed
} = require("discord.js");
// #fcbd8f
const {
    readdirSync
} = require("fs");
const db  = require("quick.db")
module.exports = {
    name: "help",
    helpname : "help <all>",
    description: "Permet d'afficher le help",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }
        
        const Dispage = require("dispage")
      
        const config = require("../../config.json")
        if(message)
    if(args[0] == "all") {

        let cats = [];
         

        const command = readdirSync(`./commands/public/`).filter((file) =>
        file.endsWith(".js")
    );
            const cmd = command.map((command) => {
                let file = require(`../../commands/public/${command}`); //getting the commands again

                if (!file.name) return "Sans nom de commande.";

                let name = file.name.replace(".js", "");

                if (client.commands.get(name).hidden) return;
                let names = client.commands.get(name).helpname;

                let emoe = prefix

                let obj = {
                    cname: `${emoe}\`${names}\``,
                }

                return obj;
            });

            let dot = new Object();

            cmd.map(co => {
                if (co == undefined) return;

                dot = {
                    name: `${cmd.length === 0 ? "En progression." : co.cname}`,

                }
                cats.push(dot)
            });
        let catts = [];
         

        const commands = readdirSync(`./commands/perm1/`).filter((file) =>
        file.endsWith(".js")
    );
            const cmds = commands.map((command) => {
                let file = require(`../../commands/perm1/${command}`); //getting the commands again

                if (!file.name) return "Sans nom de commande.";

                let name = file.name.replace(".js", "");

                if (client.commands.get(name).hidden) return;
                let names = client.commands.get(name).helpname;

                let emoe = prefix

                let obj = {
                    cname: `${emoe}\`${names}\``,
                }

                return obj;
            });

            let dota = new Object();

            cmds.map(co => {
                if (co == undefined) return;

                dota = {
                    name: `${cmds.length === 0 ? "En progression." : co.cname}`,

                }
                catts.push(dota)
            });



        let cattss = [];
         

        const commandss = readdirSync(`./commands/perm2/`).filter((file) =>
        file.endsWith(".js")
    );
            const cmdss = commandss.map((command) => {
                let file = require(`../../commands/perm2/${command}`); 

                if (!file.name) return "Sans nom de commande.";

                let name = file.name.replace(".js", "");

                if (client.commands.get(name).hidden) return;
                let names = client.commands.get(name).helpname;

                let emoe = prefix

                let obj = {
                    cname: `${emoe}\`${names}\``,
                }

                return obj;
            });

            let dotas = new Object();

            cmdss.map(co => {
                if (co == undefined) return;

                dotas = {
                    name: `${cmdss.length === 0 ? "En progression." : co.cname}`,

                }
                cattss.push(dotas)
            });


            let cattsss = [];
         

            const commandsss = readdirSync(`./commands/perm3/`).filter((file) =>
            file.endsWith(".js")
        );
                const cmdsss = commandsss.map((command) => {
                    let file = require(`../../commands/perm3/${command}`); 
    
                    if (!file.name) return "Sans nom de commande.";
    
                    let name = file.name.replace(".js", "");
    
                    if (client.commands.get(name).hidden) return;
                    let names = client.commands.get(name).helpname;
    
                    let emoe = prefix
    
                    let obj = {
                        cname: `${emoe}\`${names}\``,
                    }
    
                    return obj;
                });
    
                let dotasss = new Object();
    
                cmdsss.map(co => {
                    if (co == undefined) return;
    
                    dotasss = {
                        name: `${cmdss.length === 0 ? "En progression." : co.cname}`,
    
                    }
                    cattsss.push(dotasss)
                });

                let cattssss = [];
         

                const commandssss = readdirSync(`./commands/perm4/`).filter((file) =>
                file.endsWith(".js")
            );
                    const cmdssss = commandssss.map((command) => {
                        let file = require(`../../commands/perm4/${command}`); 
        
                        if (!file.name) return "Sans nom de commande.";
        
                        let name = file.name.replace(".js", "");
        
                        if (client.commands.get(name).hidden) return;
                        let names = client.commands.get(name).helpname;
        
                        let emoe = prefix
        
                        let obj = {
                            cname: `${emoe}\`${names}\``,
                        }
        
                        return obj;
                    });
        
                    let dotassss = new Object();
        
                    cmdssss.map(co => {
                        if (co == undefined) return;
        
                        dotassss = {
                            name: `${cmdssss.length === 0 ? "En progression." : co.cname}`,
        
                        }
                        cattssss.push(dotassss)
                    });

                    let cattsssss = [];
         

                    const commandsssss = readdirSync(`./commands/perm5/`).filter((file) =>
                    file.endsWith(".js")
                );
                        const cmdsssss = commandsssss.map((command) => {
                            let file = require(`../../commands/perm5/${command}`); 
            
                            if (!file.name) return "Sans nom de commande.";
            
                            let name = file.name.replace(".js", "");
            
                            if (client.commands.get(name).hidden) return;
                            let names = client.commands.get(name).helpname;
            
                            let emoe = prefix
            
                            let obj = {
                                cname: `${emoe}\`${names}\``,
                            }
            
                            return obj;
                        });
            
                        let dotasssss = new Object();
            
                        cmdsssss.map(co => {
                            if (co == undefined) return;
            
                            dotasssss = {
                                name: `${cmdsssss.length === 0 ? "En progression." : co.cname}`,
            
                            }
                            cattsssss.push(dotasssss)
                        });

                        let cattssssss = [];
         

                        const commandssssss = readdirSync(`./commands/perm6/`).filter((file) =>
                        file.endsWith(".js")
                    );
                            const cmdssssss = commandssssss.map((command) => {
                                let file = require(`../../commands/perm6/${command}`); 
                
                                if (!file.name) return "Sans nom de commande.";
                
                                let name = file.name.replace(".js", "");
                
                                if (client.commands.get(name).hidden) return;
                                let names = client.commands.get(name).helpname;
                
                                let emoe = prefix
                
                                let obj = {
                                    cname: `${emoe}\`${names}\``,
                                }
                
                                return obj;
                            });
                
                            let dotassssss = new Object();
                
                            cmdssssss.map(co => {
                                if (co == undefined) return;
                
                                dotassssss = {
                                    name: `${cmdssssss.length === 0 ? "En progression." : co.cname}`,
                
                                }
                                cattssssss.push(dotassssss)
                            });

                            let cattssssssss = [];
         

                            const commandsssssss = readdirSync(`./commands/perm7/`).filter((file) =>
                            file.endsWith(".js")
                        );
                                const cmdsssssss = commandsssssss.map((command) => {
                                    let file = require(`../../commands/perm7/${command}`); 
                    
                                    if (!file.name) return "Sans nom de commande.";
                    
                                    let name = file.name.replace(".js", "");
                    
                                    if (client.commands.get(name).hidden) return;
                                    let names = client.commands.get(name).helpname;
                    
                                    let emoe = prefix
                    
                                    let obj = {
                                        cname: `${emoe}\`${names}\``,
                                    }
                    
                                    return obj;
                                });
                    
                                let dotasssssss = new Object();
                    
                                cmdsssssss.map(co => {
                                    if (co == undefined) return;
                    
                                    dotasssssss = {
                                        name: `${cmdsssssss.length === 0 ? "En progression." : co.cname}`,
                    
                                    }
                                    cattssssssss.push(dotasssssss)
                                });
                                let cots = [];
                                let owner = [];
                        
                                readdirSync("./commands/").forEach((dir) => {
                                    const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                                        file.endsWith(".js")
                                    );
                        
                        
                                    const cmds = commands.map((command) => {
                                        let file = require(`../../commands/${dir}/${command}`); 
                        
                                        if (!file.name) return "Sans nom de commande.";
                    
                        
                                        let name = file.name.replace(".js", "");
                        
                                        if (client.commands.get(name).hidden) return;
                                        let names = client.commands.get(name).helpname;
                        
                                     
                                        let emoe = prefix
                        
                                        let obj = {
                                            cname: `${emoe}\`${names}\``,
                                        }
                        
                                        return obj;
                                    });
                        
                                    let dota = new Object();
                        
                                    cmds.map(co => {
                                        if (co == undefined) return;
                        
                                        dota = {
                                            name: `${cmds.length === 0 ? "En progression." : co.cname}`,
                        
                                        }
                                       owner.push(dota)
                                    });
                        
                                
                                });
                                
         let embed0 =  new MessageEmbed()
         .setTitle("Public")
         .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
         .setDescription(cats.map(e=> e.name).join(`\n`))
        let embed = new MessageEmbed()
        .setTitle("Perm 1")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(catts.map(e=> e.name).join(`\n`))

        let embed2 = new MessageEmbed()
        .setTitle("Perm 2")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(cattss.map(e=> e.name).join(`\n`))
        let embed3 = new MessageEmbed()
        .setTitle("Perm 3")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(cattsss.map(e=> e.name).join(`\n`))
        let embed4 = new MessageEmbed()
        .setTitle("Perm 4")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(cattssss.map(e=> e.name).join(`\n`))

        let embed5 = new MessageEmbed()
        .setTitle("Perm 5")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(cattsssss.map(e=> e.name).join(`\n`))
        let embed6 = new MessageEmbed()
        .setTitle("Perm 6")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(cattssssss.map(e=> e.name).join(`\n`))
        let embed7 = new MessageEmbed()
        .setTitle("Perm 7")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(cattssssssss.map(e=> e.name).join(`\n`))
        let embedO =  new MessageEmbed()
        .setTitle("Owner")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(owner.map(c=> c.name).slice(0,30).join(`\n`))
        let embedO2 =  new MessageEmbed()
        .setTitle("Owner")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(owner.map(c=> c.name).slice(30,60).join(`\n`))
        let embedO3 =  new MessageEmbed()
        .setTitle("Owner")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(owner.map(c=> c.name).slice(60,90).join(`\n`))
        let embedO4 =  new MessageEmbed()
        .setTitle("Owner")
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
        .setDescription(owner.map(c=> c.name).slice(90,120).join(`\n`))
        const embeds = [
            embed0,embed,embed2, embed3,embed4,embed5,embed6,embed7,embedO,embedO2,embedO3,embedO4
        ]

        let ez = embeds.filter(e=> e.description[0])
      
        
        return new Dispage()

            
            .setEmbeds(ez)
            .setMainStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
            .editButton("next", { label: (db.get("helpedit_right")) === null ? "👉" : db.get('helpedit_right'), emoji: "" })
            .editButton("previous", { label: (db.get("helpedit_left")) === null ? "👈" : db.get('helpedit_left'), emoji: "" })
            .removeButton("stop")
            .start(message)

    }
        let cots = [];
        let catts = [];

        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                file.endsWith(".js")
            );


            const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`); //getting the commands again

                if (!file.name) return "Sans nom de commande.";
           

                let name = file.name.replace(".js", "");

                if (client.commands.get(name).hidden) return;
                let names = client.commands.get(name).helpname;

                let des = client.commands.get(name).description;
                let emo = client.commands.get(name).emoji;
                let emoe = prefix

                let obj = {
                    cname: `\`${emoe}${names}\``,
                    des
                }

                return obj;
            });

            let dota = new Object();

            cmds.map(co => {
                if (co == undefined) return;

                dota = {
                    name: `${cmds.length === 0 ? "En progression." : co.cname}`,
                    value: co.des ? co.des : `Sans description`,

                }
                catts.push(dota)
            });

            cots.push(dir.toLowerCase());
        });





     
    
        const antiraid = new MessageEmbed()
            .addFields(catts.slice(0, 15))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        const antiraid2 = new MessageEmbed()
            .addFields(catts.slice(15, 30))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        const antiraid3 = new MessageEmbed()
            .addFields(catts.slice(30, 45))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        const antiraid4 = new MessageEmbed()
            .addFields(catts.slice(45,60))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        const antiraid5 = new MessageEmbed()
            .addFields(catts.slice(60,75))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        const antiraid6 = new MessageEmbed()
            .addFields(catts.slice(75, 90))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        const antiraid7 = new MessageEmbed()
            .addFields(catts.slice(90, 105))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
            const antiraid8 = new MessageEmbed()
            .addFields(catts.slice(105,120))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
            const antiraid9 = new MessageEmbed()
            .addFields(catts.slice(120,135))
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`)))
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
            
        //  console.log(arr.map(u=> u.name+ u.description))

        const embeds = [
            antiraid, antiraid2, antiraid3,antiraid4,antiraid5,antiraid6,antiraid7,antiraid8,antiraid9
        ]
        let ez = embeds.filter(e=> e.fields.length !== 0)
        
        return new Dispage()

            
            .setEmbeds(ez)
            .setMainStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
            .editButton("next", { label: (db.get("helpedit_right")) === null ? "👉" : db.get('helpedit_right'), emoji: "" })
            .editButton("previous", { label: (db.get("helpedit_left")) === null ? "👈" : db.get('helpedit_left'), emoji: "" })
            .removeButton("stop")
            .setDuration(30000)
            .start(message)



    }
}


function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}



