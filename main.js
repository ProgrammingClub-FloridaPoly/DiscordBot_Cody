const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv-flow').config();

const config = {
    //you must create .env file (like .env_sample) and create values
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    codeblock: process.env.CODEBLOCK,
    generalChat: process.env.GENERALCHAT,
    testingChat: process.env.TESTINGCHAT,
};

//command files using other .js files
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//listens to see if bot is online (in CMD, type: node .)
client.once('ready', () => {
    console.log('Cody is online!');

    var userID = config.owner;
    var hello = 'TESTING MODE: on Computer!\n💙💙💙';
    client.users.cache.get(userID).send(hello);

});


//makes bot listen to messages and commands
client.on('message', message=>{

    //checks if message has codeblock format
    if(!message.content.startsWith(config.codeblock) || message.author.bot) return;

    // //checks if message has Prefix command for CodyBot
    // if(!message.content.startsWith() || message.author.bot) return;

    //finds unwanted characters (`, \n), replaces them with spaces, and removes spaces
    const inBlock = /[`\n]+/g;
    const existing = message.content.replace(inBlock, ' ').trim();

    //only substrings out the code block quotes
    console.log('1) Message.content = ' + message.content);
    console.log('2) existing = :::' + existing + '::');    //check for start-end spaces

    const args = existing.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    //MESSAGE INFO
//    console.log(message);   //returns message ID
//    console.log(message.edits);     //returns attributes of message and channel
//    console.log(typeof message);
    var x = 0;
    for (arg in args){
        console.log('3.' + x + ') args = :::' + args[x] + ':::');
        x++;
    }
    console.log('3) args = ' + args);
    console.log('4) command = ' + command);
    console.log('-------------------------------------');
    

    //Dynamically analyze commands
    if (!client.commands.has(command)) return message.channel.send('```> Error: Command does not exist.```');

    try {
        client.commands.get(command).execute(message, args, Discord);
    }catch (error) {
        console.error(error);
        message.channel.send('```> Error: No response. Please try again.```');
    }

    //EMBED

});

//Keep in last line of file
client.login(config.token);
