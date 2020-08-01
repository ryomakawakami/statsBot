if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'.env'});
}

const reader = require('./reader');

const request = require('request')
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!'

client.once('ready', () => {
    console.log('Online!')
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if (command == 'help') {
        message.channel.send('>>> `!stats` to see your stats\n`!register [username]` to register your username')
    }

    if (command == 'stats') {
        if (args.length <= 1) {
            username = '';
            // If !stats
            if (args.length == 0) {
                id = message.author.id;
                username = reader.getUsername(id);
                if (reader.getUsername(id) == '-') {
                    message.channel.send('You\'re not registered. Register with `!register [username]`');
                    return;
                }
            }
            // If !stats [username]
            else {
                username = args[0];
            }
            request('https://api.hypixel.net/player?key=' + process.env.API_KEY + '&name=' + username, function(error, response, body) {
                data = JSON.parse(body)
                message.channel.send('Bedwars final kills: ' + data.player.stats.Bedwars.final_kills_bedwars + '\n' +
                    'Bedwars final deaths: ' + data.player.stats.Bedwars.final_deaths_bedwars + '\n' +
                    'Bedwars beds broken: ' + data.player.stats.Bedwars.beds_broken_bedwars);
            });
        }
        else {
            message.channel.send('Syntax: `!stats` or `!stats [username]`')
        }
    }

    if (command == 'register') {
        if (args.length != 1) {
            message.channel.send('Syntax: !register [username]')
        }
        else {
            if (reader.addUsername(message.author.id, args[0])) {
                message.channel.send('Added!')
            }
            else {
                message.channel.send('You\'re already registered!')
            }
        }
    }
})

token = process.env.token
client.login(token)
