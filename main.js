const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
require('dotenv-flow').config();

const config = {
    //you must create .env file (like .env_sample) and create values
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    codeblock: process.env.CODEBLOCK,
    generalChat: process.env.GENERALCHAT,
    testingChat: process.env.TESTINGCHAT,
    registration: process.env.REGISTRATION,
};

//command files using other .js files
const fs = require('fs');
const { type } = require('os');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//listens to see if bot is online (in CMD, type: node .)
client.once('ready', () => {
    console.log('_________________________________________________________________');
    console.log('Cody is online!');

    var userID = config.owner;
    var hello = 'TESTING MODE: on Computer!\n💙💙💙';
    client.users.cache.get(userID).send(hello);

});


//makes bot listen to messages and commands
client.on('message', message=>{


    //checks if message has codeblock format
    if(!message.content.startsWith(config.codeblock) || message.author.bot) return;

    //checks if message has Prefix command for CodyBot

    //finds unwanted characters (`, \n), replaces them with spaces, and removes spaces
    const inBlock = /[`\n]+/g;
    const existing = message.content.replace(inBlock, ' ').trim();

    //only substrings out the code block quotes
    console.log('1) Message.content = ' + message.content);
    console.log('2) existing = :::' + existing + '::');    //check for start-end spaces

    const args = existing.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    //var x = 0;
    console.log('3) args = ' + args + ':::' + args.length + ':::' + (typeof args));
    for (arg in args){
        console.log('\t\t3[' + arg + ']) args = :::' + args[arg] + ':::' + (args[arg].length) + ':::' + (typeof args[arg]));
        //x++;
    }
    
    console.log('4) command = ' + command);
    console.log('-------------------------------------');
    console.log('message id:) ' + message);
    console.log('channel.name:) ' + message.channel.name);
    console.log('-------------------------------------');

    //Dynamically analyze commands
    if (!client.commands.has(command)) return message.channel.send('```> Error: Command does not exist.```');

    try {
        client.commands.get(command).execute(message, args);
    }catch (error) {
        console.error(error);
        message.channel.send('```> Error: No response. Please try again.```');
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    console.log('===================================');
    // console.log(reaction);
    console.log('===================================');

    console.log('+++++++++++++++++++++++++');
    console.log('\nReactionADD Started');

    let applyRegistration = async () => {
        let emojiName = reaction.emoji.name;
        //console.log('1) ' + emojiName)

        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        //console.log('2B) ' + memberRole + '=>' + memberRole.name + ' ' + memberRole.id)
        
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        //console.log('2C) ' + phoenixRole + '=>' + phoenixRole.name + ' ' + phoenixRole.id)

        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        console.log('3) ' + member + '=>' + member.id + '===' + user.id)
        
        try {           
             
            if(emojiName === '👍') {
                await member.roles.add(memberRole.id)
                .catch(() => console.error('ADD MEMBER role failed.'));
                console.log('ADD MEMBER role success.')
            }

            if(emojiName === 'PhoenixPride') {
                //if user is a member already
                if (member.roles.cache.some(role => role.id === '739626738736168982')){
                    //send user DM to request verification ()
                    client.users.cache.get(member.id).send('We will begin the verification process of Florida Poly Students.');
                    
                    


                    //STEPS FOR VEIFICATION
                    //have user verifiy name, ID, email with command
                    //set nickname
                    //remove permissions to change nickname

                    //if email contains correct info, give user PhoenixRole
                    console.log('USER CAN HAVE FLPOLY STUDENT ROLE')

                    //// TEMPORARY UNTIL VERIFICATION SECTION IS COMPLETE
                    // await member.roles.add(phoenixRole.id)
                    // .catch(() => console.error('TEMP role failed.'));
                    // console.log('TEMP role success.')

                }else{
                    try {
                        let msg = await reaction.message.fetch();
                        const userReactions = await msg.reactions.cache.filter(reaction => reaction.users.cache.has(member.id));
                        console.log(userReactions.size)
                        for (const react of userReactions.values()) {
                            await react.users.remove(member.id);
                        }
                        console.log('You must be a @👍 Member first!!!')
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }
                }
                
            }
        }
        catch(err) {
            console.log('FLPOLY STUDENT ROLE ERROR:\n' + err);
        }
    }
    if(reaction.message.partial)
    {
        try {
            let msg = await reaction.message.fetch(); 
            console.log(msg.id);
            if(msg.id === config.registration)
            {
                console.log("Cached")
                applyRegistration();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else 
    {
        console.log("Not a partial.");
        if(reaction.message.id === config.registration) {
            console.log(true);
            applyRegistration();
        }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    console.log('===================================');

    // console.log(reaction);
    console.log('===================================');

    console.log('-------------------------');
    console.log('\nReactionREMOVE Started');

    let removeRegistration = async () => {
        let emojiName = reaction.emoji.name;
        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

        try {
            if(emojiName === '👍') {
                //once user agrees, user cannot un-react.
                //client.emit('messageReactionAdd', reaction, user);

                //for now they can remove the role
                await member.roles.remove(memberRole.id)
                .catch(() => console.error('REMOVE MEMBER role failed.'));
                console.log('REMOVE MEMBER role success.')
            }

            if(emojiName === 'PhoenixPride') {
                //Members should no longer have access to this channel anyway
                //This should just simply remove the role if they are not Members first
                //client.emit('messageReactionAdd', message, user);

                //for now they can remove the role
                await member.roles.remove(phoenixRole.id)
                .catch(() => console.error('REMOVE FLPOLY STUDENT role failed.'));
                console.log('REMOVE FLPOLY STUDENT role success.')
            }
        }
        catch(err) {
            console.log('removeRegistration() - THERE IS AN ERROR:' + err);
        }
    }
    if(reaction.message.partial)
    {
        try {
            let msg = await reaction.message.fetch(); 
            console.log(msg.id);
            if(msg.id === config.registration)
            {
                console.log("Cached")
                removeRegistration();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else 
    {
        console.log("Not a partial.");
        if(reaction.message.id === config.registration) {
            console.log(true);
            removeRegistration();
        }
    }
})

//Keep in last line of file
client.login(config.token);
