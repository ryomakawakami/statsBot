if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'.env'});
}

const reader = require('./reader')

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
        id = message.author.id;
        username = reader.getUsername(id);
        if (reader.getUsername(id) == '-') {
            message.channel.send('You\'re not registered. Register with `!register [username]`');
        }
        else {
            message.channel.send('You\'re ' + username);
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

    if (command == 'yes') {
        if (message.author.id == 441397838824603649) {
            message.channel.send('Yes');
        }
        else {
            message.channel.send('No');
        }
    }
    if (command == 'no') {
        if (message.author.id == 441397838824603649) {
            message.channel.send('No');
        }
        else {
            message.channel.send('Yes');
        }
    }
})

token = process.env.token
client.login(token)
