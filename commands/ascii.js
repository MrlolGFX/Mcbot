       const Discord = require('discord.js');
       const db = require('quick.db')
       const figlet = require('figlet');
       let cbase = db.fetch(`_color_base_`);
       let csuccess = db.fetch(`_color_success_`);
       let cwarn = db.fetch(`_color_warn_`);
       let cerror = db.fetch(`_color_error_`);
       let ebase = db.fetch(`_emote_base_`);
       let esuccess = db.fetch(`_emote_success_`);
       let ewarn = db.fetch(`_emote_warn_`);
       let eerror = db.fetch(`_emote_error_`);

       module.exports = {
           name: "ascii",
           description: "Ascii",

           async run(bot, message, args) {
               msg = args.join(" ");

               if (!msg) return message.channel.send({ embed: { color: cerror, description: `${eerror} | Debes poner algún mensaje` } });

               figlet.text(msg, function(err, data) {
                   if (err) {
                       message.channel.send({ embed: { color: cerror, description: `${eerror} | Ha habido un error:\n ${err}` } });
                       console.dir(err);
                       return
                   }
                   if (data.length > 2000) return message.channel.send({ embed: { color: cerror, description: `${eerror} | Debes poner algún mensaje más corto` } });

                   message.channel.send('```' + data + '```')
                   return;
               })
           }
       }