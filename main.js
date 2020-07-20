const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv-flow').config();

//pulls content of .env
const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
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

//////////////////////////////////////////////////////////////////

//listens to see if bot is online (in CMD type: node .)
client.once('ready', () => {
    
    console.log('Cody is online!');

    // Accounces that to specific chat that it is online.
    
    // var channelID = config.generalChat;
    var channelID = config.testingChat;
    var hello = 'TESTING MODE!';
    client.channels.cache.get(channelID).send(hello);

});

//makes bot listen to messages and commands
client.on('message', message=>{

    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    var mNum = message.edits;

    console.log('0) ' + message);   //returns message ID
    console.log(message.edits);
    console.log('1) ' + args);
    console.log('2) ' + command);

    // //commands
    // if(command === 'ding'){
    //     message.channel.send('dong!');
    // }
    // else if (command == 'ping'){
    //     client.commands.get('ping').execute(message, args);
    // }
    // else if (command == 'school'){
    //     client.commands.get('school').execute(message, args);
    // }

    //Dynamically analyze commands
    if (!client.commands.has(command)) 
    return message.channel.send('```>Error: Command does not exist.```');

    try {
        client.commands.get(command).execute(message, args);
    }catch (error) {
        console.error(error);
        message.channel.send('```>Error: No response. Please try again.```');
    }


    //COMMANDS



    //EMBED






});


//Keep in last line of file
client.login(config.token);
