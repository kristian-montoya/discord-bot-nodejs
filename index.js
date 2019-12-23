require('dotenv').config(); //load dotenv library so we can get token from .env
const Discord = require('discord.js'); //load discord library
const bot = new Discord.Client(); //create bot object
const TOKEN = process.env.TOKEN; //get token value from .env file

bot.login(TOKEN); //run bot with token value

bot.on('ready', () => { //ready event is fired once we're connected to bot
    console.info(`Logged in as ${bot.user.tag}!`); //if we've token is authenticated, login info is displayed
});

bot.on('message', msg => { //message event looks at each message in connected server for case sensitive matches
    if (msg.content === 'ping') { //if anyone types 'ping' into chat
        msg.reply('pong'); //tags the initial user who sent 'ping'
        msg.channel.send('pong'); //send a message in the channel without tagging a user
    } 
    else if (msg.content.startsWith('!kick')) { //if anyone enter a !kick command
        if (msg.mentions.users.size) { //if existing users were tagged in the message
            const taggedUser = msg.mentions.users.first(); //select the first user that match the tag
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`); //reply to the channel
        }
        else { //if entered user does not exist within the channel
            msg.reply('Please tag a valid user!'); //respong to the user who input the original command with an error message
        }
    }
});
