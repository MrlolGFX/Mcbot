const Discord = require('discord.js')
const db = require('quick.db')
const fs = require("fs");
bot.commands = new Discord.Collection();
const bot = new Discord.Client();

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

function guess() {}

function load(options) {

    let token = db.fetch(`_token_`);
    let prefix = db.fetch(`_prefix_`);
    if (options.token) {
        db.set(`_token_`, options.token);
        if (!options.prefix) { db.set(`_prefix_`, "!") } else db.set(`_prefix_`, options.prefix)

        fs.readdir("./commandos/", (err, files) => {

            if (err) console.log(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js");
            if (jsfile.length <= 0) {
                console.log(colors.fg.Red, `No se han encontrado comandos.\nContacte al soporte en invite.gg/polmcfly`, colors.Reset);
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commandos/${f}`);
                console.log(colors.fg.Green, `\n✅ ${f} Comando listo\n`, colors.Reset);
                bot.commands.set(props.help.name, props);
                bot.commands.set(props.help.alias, props);

            });

        });


        bot.on("ready", () => {
            console.log(colors.fg.Green, `\n✅ ${bot.user.tag} cargado con exito\n`, colors.Reset);
        })

        bot.on("message", async message => {
            //a little bit of data parsing/general checks
            if (message.author.bot) return;
            if (message.channel.type === 'dm') return;
            let content = message.content.split(" ");
            let commandp = content[0];
            let args = content.slice(1);


            //checks if message contains a command and runs it
            let commandfile = bot.commands.get(commandp.slice(prefix.length));
            if (commandfile) commandfile.run(bot, message, args);
        })
        bot.login(token)

    }

    //errors
    if (!options.token) return console.log(colors.fg.Red, "Debes completar todos los campos\nSi tienes algún problema revisa los docs\n(https://www.npmjs.com/package/mcbot)", colors.Reset);
}


//exportar
module.exports.guess = guess;
module.exports.load = load;