const Discord = require('discord.js')
const db = require('quick.db')
const fs = require("fs");
const { join } = require('path');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();




const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m" //القرمزي
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};

console.log(colors.fg.Green, "\n\n✅ McBot cargado con exito\n\n", colors.Reset);

function load(options) {

    const commandFiles = fs.readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));



    for (const file of commandFiles) {
        const command = require(join(__dirname, "commands", `${file}`));

        bot.commands.set(command.name, command);
    }


    let token = db.fetch(`_token_`);
    let prefix = db.fetch(`_prefix_`);
    //custom
    let cbase = db.fetch(`_color_base_`);
    let csuccess = db.fetch(`_color_success_`);
    let cerror = db.fetch(`_color_error_`);
    let cwarn = db.fetch(`_color_warn_`);
    let ebase = db.fetch(`_emote_base_`);
    let esuccess = db.fetch(`_emote_success_`);
    let eerror = db.fetch(`_emote_error_`);
    let ewarn = db.fetch(`_emote_warn_`);


    if (options.token) {
        db.set(`_token_`, options.token);
        if (!options.prefix) { db.set(`_prefix_`, "!") } else db.set(`_prefix_`, options.prefix)
        if (!options.Color_Base) { db.set(`_color_base_`, "#00d6ff") } else db.set(`_color_base_`, options.Color_Base)
        if (!options.Color_Success) { db.set(`_color_success_`, "#01CF00") } else db.set(`_color_success_`, options.Color_Success)
        if (!options.Color_Warn) { db.set(`_color_warn_`, "#01CF00") } else db.set(`_color_warn_`, options.Color_Warn)
        if (!options.Color_Error) { db.set(`_color_error_`, "#FBDD00") } else db.set(`_color_error_`, options.Color_Error)
        if (!options.Emote_Base) { db.set(`_emote_base_`, "🛡️") } else db.set(`_emote_base_`, options.Emote_Base)
        if (!options.Emote_Success) { db.set(`_emote_success_`, "✅") } else db.set(`_emote_success_`, options.Emote_Success)
        if (!options.Emote_Warn) { db.set(`_emote_warn_`, "⚠️") } else db.set(`_emote_warn_`, options.Emote_Warn)
        if (!options.Emote_Error) { db.set(`_emote_error_`, "❌") } else db.set(`_emote_error_`, options.Emote_Error)







        bot.on("ready", () => {
            console.log(colors.fg.Green, `\n✅ ${bot.user.tag} cargado con exito\n`, colors.Reset);
            bot.user.setPresence({
                status: "online",
                activity: {
                    name: `${bot.user.name} | ${prefix}ping`,
                    type: "PLAYING"
                }
            });
        })


        bot.on("message", async message => {
            if (message.author.bot) return;
            const args = message.content.substring(prefix.length).split(" ")
            if (message.channel.type === 'dm') return;
            let user = message.author;
            let user1 = message.mentions.users.first()

            if (message.content.startsWith(prefix)) {

                const args = message.content.slice(prefix.length).trim().split(/ +/);

                const command = args.shift().toLowerCase();
                if (!bot.commands.has(command)) return;


                try {
                    bot.commands.get(command).run(bot, message, args);

                } catch (error) {
                    console.error(error);
                }
            }

        })
        bot.login(token)

    }

    //errors
    if (!options.token) return console.log(colors.fg.Red, "Debes completar todos los campos\nSi tienes algún problema revisa los docs\n(https://www.npmjs.com/package/mcbot)", colors.Reset);
}


//exportar
module.exports.load = load;