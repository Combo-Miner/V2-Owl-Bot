const chalk = require(`chalk`);
const {
    MessageSelectMenu,
    MessageActionRow,
    MessageButton
} = require(`discord.js`);

/* MENU CREATOR */
/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = (
    array
) => {

    if (!array) throw new Error(chalk.red.bold(`The options were not provided! Make sure you provide all the options!`));
    if (array.length < 0) throw new Error(chalk.red.bold(`Tu dois sélectionner au moins une chose!`));
    let select_menu;

    let id = `help-menus`;

    let menus = [];

    const emo = {
        fun: '🎮',
        utility: "🔨",
        moderation: "⚙️",
        antiraid: "🛡️",
        info: "📑",
        owner: "<:OwnerIcon:987081580856102912>",
        permissions: "⚜️",
        administration : "🚫",

    }

    // now lets run it
    array.forEach(cca => {
        let name = cca;
        let sName = `${name.toUpperCase()}`
        let tName = name.toLowerCase();
        let fName = name.toUpperCase();
        let e = emo

        return menus.push({
            label: sName,
            //description: `${tName} commandes!`,
            value: fName,
            emoji: e[tName]
        })
    });
    let row = new MessageActionRow()
        .addComponents([
            new MessageButton()
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=984149324780941393&permissions=8&scope=bot%20applications.commands`)
                .setLabel("Invite")
                .setStyle("LINK")
                .setEmoji("<a:valide:985109032517898280>"),
            new MessageButton()
                .setCustomId('pagination')
                .setLabel("Retour")
                .setEmoji('🏚️')
                .setStyle('PRIMARY'),
    new MessageButton()
                .setURL('https://discord.gg/w9mhcmWwk8')
                .setLabel('Support Server')
                .setEmoji("<:Discord_Partner:987096777800962059>")
                .setStyle('LINK')
        ])

    let chicken = new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder(`Choisi la catégorie des commandes`)
        .addOptions(menus)

    select_menu = new MessageActionRow()
        .addComponents(
            chicken
        );


    return {
        smenu: [select_menu, row],
        sid: id
    }
}

module.exports = create_mh;