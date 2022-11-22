const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const client = require("../../index")
client.on("inviteDelete",async ( invite) => {
    let invites = await invite.guild.fetch()
    if(invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData());
    client.guildInvites.set(invite.guild.id, invite);
    db.delete(`invites.${invite.code}`);

});