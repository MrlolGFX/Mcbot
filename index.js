const Discord = require('discord.js')
const db = require('quick.db')
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const { readdirSync } = require('fs');



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

    let token = db.fetch(`_token_`);
    let prefix = db.fetch(`_prefix_`);
    if (options.token) {
        db.set(`_token_`, options.token);
        if (!options.prefix) { db.set(`_prefix_`, "!") } else db.set(`_prefix_`, options.prefix)


        const commandFiles = readdirSync(join(__dirname, "commandos")).filter(file => file.endsWith(".js"));



        for (const file of commandFiles) {
            const command = require(join(__dirname, "commandos", `${file}`));
            client.commands.set(command.name, command);
            client.commands.set(command.aliases, command);

        }

        bot.on("ready", () => {
            console.log(colors.fg.Green, `\n✅ ${bot.user.tag} cargado con exito\n`, colors.Reset);
            bot.user.setPresence({
                status: "online",
                activity: {
                    name: `${prefix}`,
                    type: "PLAYING"
                }
            });
        })


        bot.on("message", async message => {
            if (message.author.bot) return;
            if (message.channel.type === 'dm') return;
            let user = message.author;
            let user1 = message.mentions.users.first()
                // if (message.content.startsWith(`${prefix}ping`)) {
                //   message.channel.send(`🏓Ping: ${msg.createdTimestamp - message.createdTimestamp}ms. API ping discord: ${Math.round(client.ws.ping)}ms`);
                //}


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
module.exports.guess = guess;
module.exports.load = load;