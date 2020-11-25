const Discord = require('discord.js');
const db = require('quick.db')
let base = db.fetch(`_color_base_`);
let error = db.fetch(`_color_error_`);
let success = db.fetch(`_color_success_`);

module.exports = {
    name: "ping",
    description: "Ping",
    alias: ['ping', 'pingbot'],

    async run(bot, message, args) {
        const ping = new Discord.MessageEmbed()
            .setDescription(`🏓\`${Date.now() - message.createdTimestamp}\`ms`)
            .setColor(base)


        message.channel.send(ping);
        return;
    }
}