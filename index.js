const Discord = require('discord.js')
const db = require('quick.db')
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
console.log(colors.bg.White, colors.fg.Black, "✅ McBot cargado con exito ", colors.Reset);

function guess() {}

function load(options) {
    let token = db.fetch(`_token_`);
    let prefix = db.fetch(`_prefix_`);
    const bot = Discord.Client();
    if (options.token) {
        db.set(`_token_`, options.token);

        bot.on("ready", () => {
            console.log(colors.fg.Green, `✅  ${bot.username} cargado con exito`, colors.Reset);
        })
        bot.login(token)
    }

    //errors
    if (!options.token || !options.prefix) return console.log(colors.fg.Red, "Debes completar todos los campos\nSi tienes algún problema revisa los docs\n(https://www.npmjs.com/package/mcbot)", colors.Reset);
}


//exportar
module.exports.guess = guess;
module.exports.load = load;