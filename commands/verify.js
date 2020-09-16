const Discord = require('discord.js');

const config = {
    //verification: process.env.VERIFICATION,
    verification: process.env.DEVVERIFICATION,
    server: process.env.SERVERNAME,
};

var argCheck = (args) => {

    if (args.length != 4) return false

    let email = args[0].toLowerCase()
    let fName = args[1].toLowerCase()
    let lName = args[2].toLowerCase()
    let studentID = args[3]

    //checks args[0]
    let emailREGEX = /^[a-zA-Z]+\d\d\d\d@floridapoly.edu/g
    if (!((email.length >= 22) && (emailREGEX.test(email)))) return false
    
    //PASS
    //checks args[1] - first name : checks if first letter of fname and email are the same
    if (!((fName.length >= 2) && (fName.charAt(0) === email.charAt(0)))) return false

    //checks args[2] - last name : checks if last name is in email
    if (!((lName.length >= 2) && (email.includes(lName)))) return false

    //checks args[3]
    if (!((studentID.length == 4) && (email.includes(studentID)))) return false
    
    //check for everything in place
    let emailCheck = fName.charAt(0) + lName + studentID + '@floridapoly.edu'
    if (!((emailCheck === email))) return false
    
    console.log("TRUE FOR ALL")
    return true
}

var verify = async (message, args, client) => {

    // Message is sent to e-board members to manually verify
    let verifyChannel = client.channels.cache.find(TextChannel => TextChannel.id === config.verification)
    let user = client.users.cache.find(member => member.id === message.author.id)
    let roleTEST = client.guilds.cache.find(guild => guild.name === config.server).roles.cache.find(role => role.name === '🔥 Florida Poly Student')

    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#532D8E')
    .setTitle('__**STUDENT VERIFICATION REQUEST:**__')
    .setDescription(`Verify that the following user is a student using [Microsoft Azure Directory](https://portal.azure.com). Make sure that the profile avatar is in accordance to rules.\n\nOnce the information has been verified, you can proceed to grant the ${roleTEST} role to the user.\n`)
    .addFields(
        { name: 'Discord User', value: `${message.author}`},
        { name: 'Student Name', value: `${args[1]} ${args[2]}`, inline: true },
        { name: 'Student ID', value: `${args[3]}`, inline: true },
        { name: 'Student Email', value: `${args[0]}`, inline: true },
    )
    .setTimestamp()
    .setFooter(`Requested by ${user.tag}.`, user.displayAvatarURL());

    //verifyChannel.send('THIS IS A TEST!!');
    verifyChannel.send({embed: exampleEmbed})
    .then(embedMessage => embedMessage.react('✅').then(() => embedMessage.react('❌')))



        console.log('VERIFICATION BEGINS!');


        //COPIED FROM MAIN.JS FOR UPDATED VERSION        
        // let verifyChannel = client.channels.cache.find(channel => channel.id === config.verification)
        // console.log(typeof verifyChannel)
        // console.log(verifyChannel)
                
        // client.channels.cache.get(config.verification).send(`<@${member.id}> has been granted <@&${phoenixRole.id}>. Please manually verify that this user is a Florida Poly Student.`);

        // await member.roles.add(phoenixRole.id)
        // .catch(() => console.error('TEMP role failed.'));


        //Only @Members can use this command in DMs
        //if no student ID, member is using work email or is a faculty.
        //verify if email exists (By Hand, ping, or MSGraph)
        //if NO PASS, user must resend info correctly
        //if PASS, change nickname & remove permission to change nickname

    
}


module.exports = {
    name: 'verify',
    aliases: ["ver"],
    description: "starts verification process of Florida Poly Student ",
    execute(message, args, client){

        let role = client.guilds.cache.find(guild => guild.name === config.server).roles.cache.find(role => role.name === '👍 Member')

        //check if command is in DM
        if (!(message.channel.type === 'dm')) return console.log(`${message.author.name} attempted verification outside of DM.`);
        
        //check if user is a member (just in case)

        //check if arguments are exact
        if (argCheck(args)){
            //if true, begin verification
            verify(message, args, client)
        }else{
            let user = client.users.cache.find(member => member.id === message.author.id)
            console.log(user)

            //send user DM to resend verification command
            user.send('Sorry, it looks like something is wrong with your arguments.\n\n***Please enter the following commands, replacing with your information:***\n\`\`\`>_cody verify <Florida_Poly_student_email> <first_name> <last_name> <last_4_of_studentID>\`\`\`')  
        }
    }
}