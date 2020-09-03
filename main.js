const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
require('dotenv-flow').config();

var x = 1;

const config = {
    //you must create .env file (like .env_sample) and create values

    //DEVELOPMENT MODE:
    //WORKING IN DEV BRANCH. REPLACE DEV VALUES AND MERGE TO MASTER

    //token: process.env.TOKEN,
    token: process.env.DEV,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    codeblock: process.env.CODEBLOCK,
    generalChat: process.env.GENERALCHAT,
    testingChat: process.env.TESTINGCHAT,
    //registration: process.env.REGISTRATION,
    registration: process.env.DEVREGISTRATION,
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
    console.log('Cody (DEV) is online!');

    var userID = config.owner;
    var hello = 'DEVELOPMENT MODE: on Computer!\n💜💜💜💜💜💜💜💜';
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

// client.on('raw', packet => {
    
//     // We don't want this to run on unrelated packets
//     if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_CREATE'].includes(packet.t)) return;

//     console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//     console.log(packet)
//     console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

// });

client.on('messageReactionAdd', async (reaction, user) => {
    console.log('+++++++++++++++++++++++++');
    console.log('            ' + x);
    console.log('+++++++++++++++++++++++++');
    console.log('\nReactionADD Started');

    let applyRegistration = async () => {

        let emojiName = reaction.emoji.name;
        console.log(emojiName)
        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

        let userPHOENIX1 = member.roles.cache.some(role => role.id === phoenixRole.id)
        let userMEMBER1 = member.roles.cache.some(role => role.id === memberRole.id)
        console.log('\nCLICK:\t' + emojiName + '\t' + userMEMBER1 + '\t' + userPHOENIX1 + '\n')

        const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
            .map(role => role.name.toString())
                
            
        console.log(`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}\n`)
        

        console.log(reaction.message.reactions.cache.values())


        try {                       
            //if user added 👍 AND is not a MEMBER
            if((emojiName === '👍') && (!userMEMBER1 && !userPHOENIX1)) {
                console.info('SELECTED PATH A: A| 1 F F')
                //give MEMBER role
                await member.roles.add(memberRole.id)
                .catch(() => console.error('ADD MEMBER role failed.'));
                console.log('SELECTED PATH A: MEMBER role success.')
            }

            //if user added Phoenix AND is a MEMBER
            else if((emojiName === 'PhoenixPride') && (userMEMBER1 && !userPHOENIX1)) {
                console.info('SELECTED PATH B: A|2 T F')
                //if user is a MEMBER already
                    
                    //send user DM to request verification ()
                    client.users.cache.get(member.id).send('We will begin the verification process of Florida Poly Students.');
                    
                    //// TEMPORARY UNTIL VERIFICATION SECTION IS COMPLETE
                    await member.roles.add(phoenixRole.id)
                    .catch(() => console.error('TEMP role failed.'));
                    console.log('SELECTED PATH B: TEMP role success.')
                //}
            }
            // else if ((emojiName === 'PhoenixPride') && (!userMEMBER1)){
            else {
                
                    console.info('SELECTED PATH C: A|2 F F')
                    
                    //remove PHOENIX role
                    await member.roles.add(phoenixRole.id)
                    .catch(() => console.error('PHOENIX role does not exist for User.'));

                    try {
                        let msg = await reaction.message.fetch();
                        const userReactions = await msg.reactions.cache.filter(reaction => reaction.users.cache.has(member.id));
                        
                        //it removes all reactions that was reacted (can be many selected)
                        for (const react of userReactions.values()) {
                            await react.users.remove(member.id);
                            console.info('ALL Reactions Removed')
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }

                    //remove MEMBER role
                    await member.roles.add(memberRole.id)
                    .catch(() => console.error('MEMBER role does not exist for User.'));

                    // //then removes role
                    //     if (userPHOENIX1){
                    //         let newEmoji = client.emojis.cache.find(emoji => emoji.name === "👍") 
                    //         reaction.emoji.name = newEmoji.name;
                    //         reaction.emoji.id = newEmoji.id;
                            
                    //         //if user is NOT a MEMBER, emoji reaction is removed.
                    //         await member.roles.remove(phoenixRole.id)
                    //         .catch(() => console.error('TEMP role failed.'));
                    //         //console.log('TEMP role success.')
                    //     }
                    console.info('SELECTED PATH C: ALL roles and reactions success')
                }
        }
        catch(err) {
            console.log('FLPOLY STUDENT ROLE ERROR:\n' + err);
        }

        let userPHOENIX2 = member.roles.cache.some(role => role.id === phoenixRole.id)
        let userMEMBER2 = member.roles.cache.some(role => role.id === memberRole.id)
        
        console.log('\nRESULT:\t' + emojiName + '\t' + userMEMBER2 + '\t' + userPHOENIX2 + '\n')

        console.log('+++++++++++++++++++++++++');
        console.log('            ' + x);
        console.log('+++++++++++++++++++++++++');
        x++;

    }

    if(reaction.message.partial)
    {
        try {
            let msg = await reaction.message.fetch(); 
            //console.log(msg.id);
            if(msg.id === config.registration)
            {
                console.log("Message is a partial, but is Now Cached")
                applyRegistration();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else 
    {
        console.log("Not a partial. Already Cached.");
        if(reaction.message.id === config.registration) {
            console.log(true);
            applyRegistration();
        }
    }

});

client.on('messageReactionRemove', async (reaction, user) => {
    console.log('-------------------------');
    console.log('            ' + x);
    console.log('-------------------------');
    console.log('\nReactionREMOVE Started');

    let removeRegistration = async () => {

        let emojiName = reaction.emoji.name;
        console.log(emojiName)
        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

        let userPHOENIX1 = member.roles.cache.some(role => role.id === phoenixRole.id)
        let userMEMBER1 = member.roles.cache.some(role => role.id === memberRole.id)
        console.log('\nCLICK:\t' + emojiName + '\t' + userMEMBER1 + '\t' + userPHOENIX1 + '\n')

        const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
            .map(role => role.name.toString())
            
        console.log(`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}\n`)
        console.log(reaction.message.reactions.cache.values())

        try {
            if((emojiName === 'PhoenixPride') && (userMEMBER1 && userPHOENIX1)) {
                console.info('SELECTED PATH E: R|2 T T')
                
                //if (member.roles.cache.some(role => role.id === phoenixRole.id)){
                    try {
                        await member.roles.remove(phoenixRole.id)
                        .catch(() => console.error('REMOVE STUDENT role failed.'));
                        console.log('REMOVE STUDENT role success.')
                    } catch (error) {
                        console.error('Failed role removal - PHOENIXPRIDE.');
                    }
            }
            else if ((emojiName === '👍') && (userMEMBER1 && !userPHOENIX1)) {

                console.info('SELECTED PATH F: R|1 T F')
                try {
                    await member.roles.remove(memberRole.id)
                    .catch(() => console.error('REMOVE STUDENT role failed.'));
                    console.log('REMOVE STUDENT role success.')
                } catch (error) {
                    console.error('Failed role removal - PHOENIXPRIDE.');
                }


            }
            else {
                console.info('SELECTED PATH D: R|1 T T')
                    
                    //remove PHOENIX role
                    await member.roles.add(phoenixRole.id)
                    .catch(() => console.error('PHOENIX role does not exist for User.'));

                    try {
                        let msg = await reaction.message.fetch();
                        const userReactions = await msg.reactions.cache.filter(reaction => reaction.users.cache.has(member.id));
                        
                        //it removes all reactions that was reacted (can be many selected)
                        for (const react of userReactions.values()) {
                            await react.users.remove(member.id);
                            console.info('ALL Reactions Removed')
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }

                    //remove MEMBER role
                    await member.roles.add(memberRole.id)
                    .catch(() => console.error('MEMBER role does not exist for User.'));

                    console.info('SELECTED PATH D: ALL roles and reactions success')
            }
            
        }
        catch(err) {
            console.log('removeRegistration() - THERE IS AN ERROR:' + err);
        }
        // //setTimeout(function(){
            let userPHOENIX2 = member.roles.cache.some(role => role.id === phoenixRole.id)
            let userMEMBER2 = member.roles.cache.some(role => role.id === memberRole.id)
    
        console.log('\nRESULT:\t' + emojiName + '\t' + userMEMBER2 + '\t' + userPHOENIX2 + '\n')

        console.log('-------------------------');
        console.log('            ' + x);
        console.log('-------------------------')
        x++
    }

    if(reaction.message.partial)
    {
        try {
            let msg = await reaction.message.fetch(); 
            console.log(msg.id);
            if(msg.id === config.registration)
            {
                console.log("Message is a partial, but is Now Cached")
                removeRegistration();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else 
    {
        console.log("Not a partial. Already Cached.");
        if(reaction.message.id === config.registration) {
            console.log(true);
            removeRegistration();
        }
    }

})

//Keep in last line of file
client.login(config.token);
