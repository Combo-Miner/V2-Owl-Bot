const client = require("../../index");
const { MessageEmbed } = require('discord.js');
const color = 'BLUE'

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Une erreur est survenu " });

        // User/bot Permissions Check
        if (cmd.userPerms || cmd.botPerms) {
            if (!interaction.member.permissions.has(cmd.userPerms || [])) {
                const userPerms = new MessageEmbed()
                    .setDescription(`🚫 ${interaction.author}, Tu n'as pas  \`${cmd.userPerms}\` permissions pour utiliser cette commande!`)
                    .setColor('#ed4245')
                return interaction.followUp({ embeds: [userPerms] })
            }
            if (!interaction.guild.me.permissions.has(cmd.botPerms || [])) {
                const botPerms = new MessageEmbed()
                    .setDescription(`🚫 ${interaction.author},Je n'ai pas  \`${cmd.userPerms}\` permisson pour utiliser cette commande!`)
                    .setColor('#ed4245')
                return interaction.followUp({ embeds: [botPerms] })
            }
        }


        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }


    //Reacion Role Handler
    if (interaction.isSelectMenu()) {
        if (interaction.customId == 'reaction-roles') { 
        await interaction.deferReply({ ephemeral: true })
        const roleId = interaction.values[0];
        const role = interaction.guild.roles.cache.get(roleId)
        const memberRoles = interaction.member.roles

        const hasRole = memberRoles.cache.has(roleId)

        if (hasRole) {
            memberRoles.remove(roleId)
            interaction.followUp(`tu ne posséde plus le rôle *${role.name}*!`)
        } else {
            memberRoles.add(roleId)
            interaction.followUp(`tu  posséde maiteanant le rôle *${role.name}*!`)
        }
        } else if (interaction.customId == "reaction-roles2") {
            await interaction.deferReply({ ephemeral: true })
        const roleId = interaction.values[0];
        const role = interaction.guild.roles.cache.get(roleId)
        const memberRoles = interaction.member.roles

        const hasRole = memberRoles.cache.has(roleId)

        if (hasRole) {
            memberRoles.remove(roleId)
            interaction.followUp(`tu ne posséde plus le rôle *${role.name}*!`)
        } else {
            memberRoles.add(roleId)
            interaction.followUp(`tu  posséde maiteanant le rôle *${role.name}*!`)
        }
        }else if (interaction.customId == "reaction-roles3") {
            await interaction.deferReply({ ephemeral: true })
        const roleId = interaction.values[0];
        const role = interaction.guild.roles.cache.get(roleId)
        const memberRoles = interaction.member.roles

        const hasRole = memberRoles.cache.has(roleId)

        if (hasRole) {
            memberRoles.remove(roleId)
            interaction.followUp(`tu ne posséde plus le rôle *${role.name}*!`)
        } else {
            memberRoles.add(roleId)
            interaction.followUp(`tu  posséde maiteanant le rôle *${role.name}*!`)
        } 
    }
    }
}


)


