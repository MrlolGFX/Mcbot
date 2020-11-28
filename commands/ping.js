const Discord = require('discord.js');
const db = require('quick.db')
let cbase = db.fetch(`_color_base_`);
let csuccess = db.fetch(`_color_success_`);
let cwarn = db.fetch(`_color_warn_`);
let cerror = db.fetch(`_color_error_`);
let ebase = db.fetch(`_emote_base_`);
let esuccess = db.fetch(`_emote_success_`);
let ewarn = db.fetch(`_emote_warn_`);
let eerror = db.fetch(`_emote_error_`);

module.exports = {
    name: "ping",
    description: "Ping",
    alias: ['ping', 'pingbot'],

    async run(bot, message, args) {
        const ping = new Discord.MessageEmbed()
            .setDescription(`🏓 **${Date.now() - message.createdTimestamp}**ms`)
            .setColor(cbase)


        message.channel.send(ping);
        return;
    }
}