const Discord = require('discord.js');
//const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

const config = {
    //verification: process.env.VERIFICATION,
    verification: process.env.DEVVERIFICATION,
};

var verify = async (message, args, client) => {

        // message.client.guilds.find(role => role.name === '👍 Member');

        //sends message to Verification channel for Manual verification
        let verifyChannel = client.channels.cache.find(TextChannel => TextChannel.id === config.verification)
        //let verifyChannel = await client.channels.fetch(config.verification)
        //verifyChannel.send('verification test from VERIFY 1')
        console.log(verifyChannel)

        console.log(config.verification)
        client.channels.cache.get(config.verification).send('verification test from VERIFY 2');
        verifyChannel.send('verification test from VERIFY 1');

        console.log(message)
        
        //Only @Members can use this command in DMs
        //let memberRole = message.member..roles.cache.find(role => role.name === '👍 Member');
        //let userMEMBER = message.member.roles.cache.some(role => role.name === '👍 Member')

        let user = message.author.id;
        //console.log(typeof user)
        console.log(user)
        //let memberRole = user.roles.(role => role.name === '👍 Member');

        //if(!message.member.hasPermission('MANAGE')) return message.channel.send('```> You cannot clear messages```');
        //console.log(memberRole)

        //console.log(message.channel.type) // if ... === 'dm'


        console.log('VERIFICATION BEGINS!');

        // //TEMP: create manual verification with info sent in embed to eboard
        // message.member.

        // const exampleEmbed = new Discord.MessageEmbed()
	    // .setColor('#0099ff')
	    // .setTitle('Some title')
	    // .setURL('https://discord.js.org/')
	    // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	    // .setDescription('Some description here')
	    // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
	    // .addFields(
		//     { name: 'Regular field title', value: 'Some value here' },
		//     { name: '\u200B', value: '\u200B' },
		//     { name: 'Inline field title', value: 'Some value here', inline: true },
		//     { name: 'Inline field title', value: 'Some value here', inline: true },
	    // )
	    // .addField('Inline field title', 'Some value here', true)
	    // .setImage('https://i.imgur.com/wSTFkRM.png')
	    // .setTimestamp()
	    // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        // channel.send(exampleEmbed);
        
        //Only @Members can use this command in DMs
        
        //verify @floridapoly.edu

        //verify email and inputs matches

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

        if (!(message.channel.type === 'dm')) return console.log(`${message.author.name} attempted verification outside of DM.`);


        verify(message, args, client)
    }
}