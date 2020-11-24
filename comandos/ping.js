const Discord = require('discord.js');
module.exports.run = async(bot, message, args) => {
    message.channel.send(`🏓Ping: ${msg.createdTimestamp - message.createdTimestamp}ms. API ping discord: ${Math.round(client.ws.ping)}ms`);
}
module.exports.help = {
    name: "ping",
    alias: ['ping', 'pingbot']
}