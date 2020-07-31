if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'.env'});
}

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

    if (command == 'ping') {
        message.channel.send('pong')
    }
})

token = process.env.token
client.login(token)
