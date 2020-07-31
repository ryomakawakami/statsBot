if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'.env'});
}

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Online!')
})

token = process.env.token
client.login(token)
