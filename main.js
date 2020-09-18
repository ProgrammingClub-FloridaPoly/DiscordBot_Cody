const { timeStamp } = require('console');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
require('dotenv-flow').config();

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
    //verification: process.env.VERIFICATION,
    verification: process.env.DEVVERIFICATION,
    server: process.env.SERVERNAME,
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
    console.log('3) args = ' + args + ':::' + args.length + ':::' + (typeof args));
    for (arg in args){
        console.log('\t\t3[' + arg + ']) args = :::' + args[arg] + ':::' + (args[arg].length) + ':::' + (typeof args[arg]));
    }
    
    console.log('4) command = ' + command);
    console.log('-------------------------------------');
    console.log('message id:) ' + message);
    console.log('channel.name:) ' + message.channel.name);
    console.log('-------------------------------------');

    //Dynamically analyze commands
    if (!client.commands.has(command)) return message.channel.send('```> Error: Command does not exist.```');

    try {
        client.commands.get(command).execute(message, args, client);
    }catch (error) {
        console.error(error);
        message.channel.send('```> Error: No response. Please try again.```');
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    let studentRegistration = async() => {
        console.log('STUDENT REGISTRATION STARTS HERE!!')

        let emojiName = reaction.emoji.name;
        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        let id = reaction.message.embeds[0].fields[0].value.replace(/(<@|>)+/g, '')
        let member = reaction.message.guild.members.cache.find(member => member.id === id);

        //check is user is still member, if not then do nothing.
        if (!member.roles.cache.some(role => role.id === memberRole.id)){
            //change message color
            const statusColor = reaction.message.embeds[0]
            .setTitle('__**STUDENT VERIFICATION: ERROR**__')
            .setDescription(`An ERROR occured! Some time has passed and ${user.id} is no longer a ${memberRole}. Student Verification cannot continue. A message has been sent to the user.\n\nPlease give user some time to regain membership status.`);
            reaction.message.edit(statusColor)

            member.send(`URGENT ${member}!\n\nYour verification request has an error. Some time has passed since your verification request and you no longer have the \`@ Member\` role. Student verification cannot continue.\n\nIn order to recieve the \`@ Florida Poly student\` role, you must be a \`@ Member\`. Please go the \`# Registration\` channel and agree to Programming_Club's server rules.`)
            return
        }

        try {                       
            if(emojiName === 'PhoenixPride') {
                //change message color
                const statusColor = reaction.message.embeds[0]
                .setTitle('__**STUDENT VERIFICATION: APPROVED**__')
                .setColor('#532D8E')
                .setDescription(`User has been ***APPROVED*** the ${phoenixRole} role by <@${user.id}>. User's nickname has been changed and has been notified.`);
                reaction.message.edit(statusColor)

                //change userName
                const updateName = reaction.message.embeds[0].fields[1].value
                await member.setNickname(updateName)
                .catch((error) => console.error('NICKNAME CHANGE failed:' + error));

                //add role to member
                await member.roles.add(phoenixRole.id)
                .catch(() => console.error('ADD PHOENIX role failed.'));

                //send user DM
                member.send(`🎊Congrats, ${member}!🎉\n\nYour verification request has been APPROVED. You have been GRANTED the \`@ Florida Poly student\` role which allows you to get full access of this server.\n\nHere's something to keep in mind while at Florida Poly:\n***"You only get out what you put in. Don't expect more until you do more."***\n\nHope this helps as you prepare for your career. In the meantime, enjoy your time at Florida Poly!\n\n**Go Phoenix!**`)
                
                const attachment = new Discord.MessageAttachment('./images/PhoenixPride.gif');
                member.send(attachment)

            }
            else if(emojiName === '❌') {
                //change message color
                const statusColor = reaction.message.embeds[0]
                .setTitle('__**STUDENT VERIFICATION: DENIED**__')
                .setColor('#F03A17')
                .setDescription(`User has been ***DENIED*** the ${phoenixRole} role by <@${user.id}>. User has been notified.`);
                reaction.message.edit(statusColor)

                //send user DM
                member.send('Oh no!\n\nSory, but it looks like your verification request has been DENIED.\n\nIf you feel like this is an error, please reach out to a member of eboard to help you resolve this issue.\n\n Have a nice day!')    
            }
            else {
                
                try {
                    await reaction.message.reactions.removeAll()
                    .catch((error) => console.error('NICKNAME CHANGE failed:' + error));

                    // let msg = await reaction.message.fetch();
                    // const userReactions = await msg.reactions.cache.filter(reaction => reaction.users.cache.has(member.id));
                        
                    // //it removes all reactions that was reacted (can be many selected)
                    // for (const react of userReactions.values()) {
                    //     await react.users.remove(member.id);
                    //     console.info('ALL Reactions Removed')
                    // }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }
            }
        }
        catch(err) {
            console.log('GRANT FLPOLY STUDENT ROLE ERROR:\n' + err);
        }
    }

    let applyRegistration = async () => {

        let emojiName = reaction.emoji.name;
        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);



        //checks if a member has a certain role
        let userPHOENIX = member.roles.cache.some(role => role.id === phoenixRole.id)
        let userMEMBER = member.roles.cache.some(role => role.id === memberRole.id)
        
        try {                       
            //if user added 👍 AND is not a MEMBER
            if((emojiName === '👍') && (!userMEMBER && !userPHOENIX)) {
                console.info('SELECTED PATH A: A| 1 F F')
                //give MEMBER role
                await member.roles.add(memberRole.id)
                .catch(() => console.error('ADD MEMBER role failed.'));
            }

            //if user added Phoenix AND is a MEMBER
            else if((emojiName === 'PhoenixPride') && (userMEMBER && !userPHOENIX)) {
                console.info('SELECTED PATH B: A|2 T F')
                
                //send user DM to request verification ()
                member.send('Welcome, DEV!\n\nMy name is **Cody**. I am Programming Club\'s smart bot assistant.\n\nLet\'s begin the verification process for obtaining the `@ Florida Poly student` role. This role allows you to get full access to this server. You will need to access the Cody Terminal in order to proceed. The Cody Terminal is accessed by typing in special commands in codeblocks. Codeblocks can be activated by typing three backquote symbols (**\\`\\`\\`**) before and after. The backquote symbol is located below the **ESC** key.\n\nAll commands must be typed like this example:\t***\\`\\`\\`>_cody <command>\\`\\`\\`***\n\n***Please enter the following commands, replacing with your information:***\n\`\`\`>_cody verify <Florida_Poly_student_email> <first_name> <last_name> <last_4_of_studentID>\`\`\`')             
                

            }
            else {
                console.info('SELECTED PATH C: A|2 F F')
                    
                //remove PHOENIX role
                await member.roles.remove(phoenixRole.id)
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
                await member.roles.remove(memberRole.id)
                .catch(() => console.error('MEMBER role does not exist for User.'));
            }
        }
        catch(err) {
            console.log('FLPOLY STUDENT ROLE ERROR:\n' + err);
        }
    }

    if(reaction.message.partial)
    {
        //console.log(reaction.message)
        try {
            let msg = await reaction.message.fetch(); 
            //console.log(msg.id);
            if(msg.id === config.registration)
            {
                console.log("Message is a partial, but is Now Cached")
                applyRegistration();
            }
            if (msg.id === config.verification)
            {
                console.log(true);
                studentRegistration();
            }
            //console.log(msg.id)
            //console.log(config.verification)
        }
        catch(err) {
            console.log(err);
        }
    }
    else 
    {
        console.log("Not a partial. Already Cached.");
        
        if(reaction.message.id === config.registration) {
            applyRegistration();
        }
        
        if (reaction.message.channel.id === config.verification)
        {
            //console.log(true);
            studentRegistration();
        }
    }

});

client.on('messageReactionRemove', async (reaction, user) => {

    let removeRegistration = async () => {

        let emojiName = reaction.emoji.name;
        let memberRole = reaction.message.guild.roles.cache.find(role => role.name === '👍 Member');
        let phoenixRole = reaction.message.guild.roles.cache.find(role => role.name === '🔥 Florida Poly Student');
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        let userPHOENIX1 = member.roles.cache.some(role => role.id === phoenixRole.id)
        let userMEMBER1 = member.roles.cache.some(role => role.id === memberRole.id)

        try {
            if((emojiName === 'PhoenixPride') && (userMEMBER1 && userPHOENIX1)) {
                console.info('SELECTED PATH E: R|2 T T')
                
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

                //removes Phoenix role
                await member.roles.remove(phoenixRole.id)
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
                await member.roles.remove(memberRole.id)
                .catch(() => console.error('MEMBER role does not exist for User.'));

                //remove all remaining roles (if users have higher positions)
                const roleList = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.id.toString())

                await member.roles.remove(roleList)
                .catch(() => console.error('ALL roles were NOT REMOVED'));
            }
            
        }
        catch(err) {
            console.log('removeRegistration() - THERE IS AN ERROR:' + err);
        }
    }

    if(reaction.message.partial)
    {
        //console.log(reaction.message)
        try {
            let msg = await reaction.message.fetch(); 
            //console.log(msg.id);
            if(msg.id === config.registration)
            {
                console.log("Message is a partial, but is Now Cached")
                removeRegistration();
            }
            if (msg.id === config.verification)
            {
                return
            }
            //console.log(msg.id)
            //console.log(config.verification)
        }
        catch(err) {
            console.log(err);
        }
    }
    else 
    {
        console.log("Not a partial. Already Cached.");
        
        if(reaction.message.id === config.registration) {
            removeRegistration();
        }
        
        if (reaction.message.channel.id === config.verification)
        {
            return
        }
    }
})

//Keep in last line of file
client.login(config.token);
