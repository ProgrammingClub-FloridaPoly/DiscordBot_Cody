// /*  
// List of TODOs
// []  Join Server startup widow
// []  Have Bot Message you for verification request (for Student ROLE)
// []  
// []  If error occures in CODY, message error and delete two messages.
// []  Add new emojis fast.
// []  
// []  
// []  
// []  
// */    
    
    
//     // Accounces that to specific channel/user that it is online.
//     //var channelID = config.testingChat;
//     var userID = config.owner;
//     var hello = 'TESTING MODE: on Computer!\n💙💙💙';
//     //client.channels.cache.get(channelID).send(hello);
//     client.users.cache.get(userID).send(hello);



//     console.log(args == '');
//     console.log(args.length == 0);
//     console.log(parseInt(args))
//         // if ( (isNaN(args) && args.length == 0) || x == 0)  x = 1:

//         // var hasName = (name === 'true') ? 'Y' :'N';

//         //RECENT MESSAGE INFO for TESTING
// //    console.log('MESSAGE: ' + message);   //returns message ID
// //    console.log('MESSAGE.edits: ' + message.edits);     //returns attributes of message and channel
// //    console.log('TYPE: '+ typeof message);

   
// const channelID = message.channel;          //Channel ID
// const channelName = message.channel.name;   //Channel Name


            
//             // message.channel.send(fileText)
//             // .then(() => msg.react('1️⃣'))
//             // .then(() => msg.react('2️⃣'))
//             // .then(() => msg.react('3️⃣'))
//             // .then(() => msg.react('4️⃣'))
//             // .then(() => msg.react('5️⃣'))
//             // .then(() => msg.react('6️⃣'))
//             // .then(() => msg.react('7️⃣'))
//             // .then(() => msg.react('8️⃣'))
//             // .then(() => msg.react('9️⃣'))
//             // .then(() => msg.react('🔟'))
//             // .then(() => msg.react(customEmoji2))
//                   // .catch(() => console.error('One of the emojis failed to react.'));
                  


//                 //   switch (fileName) {
//                 //     case 'welcome':
//                 //     case 'rules':
//                 //       //inserts emoji
//                 //       message.channel.send(fileText)
//                 //       .then(() => message.react('🍊'))
//                 //             .then(() => message.react('🍇'))
//                 //             .catch(() => console.error('One of the emojis failed to react.'));
                      
//                 //       //message.react('👍');
//                 //       break;
//                 //     case 'registration':
//                 //       //inserts custom emoji
//                 //       const customEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'PhoenixPride');
                      
//                 //       message.channel.send(fileText)
//                 //       .then(() => message.react('🍊'))
//                 //       .then(() => message.react('🍇'))
//                 //       .then(() => message.react(customEmoji))
//                 //             .catch(() => console.error('One of the emojis failed to react.'));
                      
                      
//                 //       messsage.react(customEmoji);
//                 //       break;
//                 //     case 'channels':
//                 //     case 'connect_with_us':
//                 //     case 'test':
          
//                 //       const customEmoji2 = message.guild.emojis.cache.find(emoji => emoji.name === 'PhoenixPride');
          
          
//                 //       message.channel.send(fileText).then{react(customEmoji2)};
          
//                 //       break;
//                 //     default:
//                 //     console.log('fileName does not match cases. Update code to include new channel');
//                 //     };


//                 client.on('messageReactionAdd', async (reaction, user) => {
    
//                   console.log('\nReactionADD Started');
              
//                   let applyRegistration = async () => {
//                       let emojiName = reaction.emoji.name;
//                       console.log('1) ' + emojiName)
              
//                       let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
//                       console.log('2A) ' + role + '=>' + role.name + '===' + emojiName)
              
//                       let memberRole = raction.message.guild.roles.cache.find(role => role.name === '@👍 Member');
//                       console.log('2B) ' + memberRole + '=>' + memberRole.name + ' ' + memberRole.id)
                      
//                       let phoenixRole = raction.message.guild.roles.cache.find(role => role.name === '@🔥 Florida Poly Student');
//                       console.log('2C) ' + phoenixRole + '=>' + phoenixRole.name + ' ' + phoenixRole.id)
              
//                       let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
//                       console.log('3) ' + member + '=>' + member.id + '===' + user.id)
                      
//                       try {
//                           if(role && member) {
//                               console.log("Role and member found.");
//                               await member.roles.add(role);
//                               console.log("Done.");
//                           }
//                           if(emojiName = ) {
              
//                           }
//                           if(emojiName)
//                       }
//                       catch(err) {
//                           console.log(err);
//                       }
//                   }
//                   if(reaction.message.partial)
//                   {
//                       try {
//                           let msg = await reaction.message.fetch(); 
//                           console.log(msg.id);
//                           if(msg.id === config.registration)
//                           {
//                               console.log("Cached")
//                               applyRegistration();
//                           }
//                       }
//                       catch(err) {
//                           console.log(err);
//                       }
//                   }
//                   else 
//                   {
//                       console.log("Not a partial.");
//                       if(reaction.message.id === config.registration) {
//                           console.log(true);
//                           applyRegistration();
//                       }
//                   }
//               });
              
//               client.on('messageReactionRemove', async (reaction, user) => {
//                   console.log('\nReactionREMOVE Started');
              
              
//                   let removeRegistration = async () => {
//                       let emojiName = reaction.emoji.name;
//                       let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
//                       let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
//                       try {
//                           if(role && member) {
//                               console.log("Role and member found.");
//                               await member.roles.remove(role);
//                               console.log("Done.");
//                           }
//                       }
//                       catch(err) {
//                           console.log(err);
//                       }
//                   }
//                   if(reaction.message.partial)
//                   {
//                       try {
//                           let msg = await reaction.message.fetch(); 
//                           console.log(msg.id);
//                           if(msg.id === config.registration)
//                           {
//                               console.log("Cached")
//                               removeRegistration();
//                           }
//                       }
//                       catch(err) {
//                           console.log(err);
//                       }
//                   }
//                   else 
//                   {
//                       console.log("Not a partial.");
//                       if(reaction.message.id === config.registration) {
//                           console.log(true);
//                           removeRegistration();
//                       }
//                   }
//               })

        // let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        // console.log('2A) ' + role + '=>' + role.name + '===' + emojiName)

// //NOTE: NEED TO FIND WAY TO GET PHOENIXPRIDE EMOJI (NAME AND ID)
// let newEmoji = client.emojis.cache.find(emoji => emoji.name === "PhoenixPride") 
// //newReaction.emoji.name.replace(phoenixRole.name);
// newReaction.emoji.name = newEmoji.name;
// // newReaction.emoji.setName(phoenixRole.name);
// // newReaction.emoji.setName(phoenixRole.id)
// newReaction.emoji.id = newEmoji.id;
// //newReaction.emoji.id.replace(phoenixRole.id);

                        // let newReaction = reaction;

                        // newReaction.emoji.name.replace(phoenixRole.name);
                        // // newReaction.emoji.id = phoenixRole.id;
                        // newReaction.emoji.id.replace(phoenixRole.id);

                        // setTimeout(function(){
                        //     client.emit('messageReactionAdd', newReaction, user)
                        //     console.log('EMITTED messageReactionAdd: attempted')
                        // }, 2000)

                        // //remove the Phoenix reaction
                        // let msg = await reaction.message.fetch();
                        // const userReactions = await msg.reactions.cache.filter(reaction => reaction.users.cache.has(member.id));
                        // console.log(userReactions.size)
                        // for (const react of userReactions.values()) {
                        //     await react.users.remove(member.id);
                        // }
                        
                        // //remove the Phoenix role
                        // await member.roles.remove(phoenixRole.id)
                        // .catch(() => console.error('REMOVE STUDENT role failed.'));
                        // console.log('REMOVE BOTH roles success.')
                        // // setTimeout(function(){
                        // //     client.emit()
                        // // })

                        // //remove the Member role
                        // await member.roles.remove(memberRole.id)
                        // .catch(() => console.error('REMOVE MEMBER role failed.'));
//Emitting to this path results in permanent change in first emoji name and id.
                    //Let's try to change back the name, 
                    // if (userPHOENIX1){
                    //     let newEmoji = client.emojis.cache.find(emoji => emoji.name === "PhoenixPride") 
                    //     reaction.emoji.name = newEmoji.name;
                    //     reaction.emoji.id = newEmoji.id;
                        
                    //     //if user is NOT a MEMBER, emoji reaction is removed.
                    //     await member.roles.remove(phoenixRole.id)
                    //     .catch(() => console.error('TEMP role failed.'));
                    //     //console.log('TEMP role success.')
                    // }

                //     console.log('\nCLICK:\t' + emojiName + '\t' + userMEMBER1 + '\t' + userPHOENIX1 + '\n')

                //     const roles = member.roles.cache
                //                     .sort((a, b) => b.position - a.position)
                //         .map(role => role.name.toString())
                        
                //     console.log(`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}\n`)
            


//RAW PACKETS

// client.on('raw', packet => {
    
//     // We don't want this to run on unrelated packets
//     if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_CREATE'].includes(packet.t)) return;

//     console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//     console.log(packet)
//     console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

// });

//member.send('Welcome, DEV!\n\nMy name is Cody. I am Programming Club\'s smart bot assistant. Let\'s begin the verification process for obtaining the `@ Florida Poly student` role. This role allows you to get full access of this server.\n\nYou will need to access the Cody Terminal in order to proceed.The Cody Terminal is accessed by typing in special commands in codeblocks.\n\n***Please enter the following commands, replacing with your information:***\n\`\`\`>_cody verify <University Email> <First Name> <Last Name> <Last 4 of Student ID>\`\`\`')

//
/*
Application (client) ID → The id of your application
1ebb42d7-f577-4f08-8e82-0dfc59937819

Directory (tenant) ID → The Azure AD tenant id
8d84067d-9ad7-4572-9b10-133d36462aaa

Endpoint
https://login.microsoftonline.com/common/oauth2/v2.0/token

Client Secret
wfuVADU910+zktnURC43%}~



*/


    // //PASS
    // //checks arg[0] - email : Checks if regex is in email string
    // let emailREGEX = /^[a-zA-Z]+\d\d\d\d@floridapoly.edu/g
    // if((email.length >= 22) && (emailREGEX.test(email))){
    //     emailPASS = true
    // }else{
    //     console.log('1: Must have Florida Poly Student Email. Reenter Verification command')
    // }
    
    // //PASS
    // //checks arg[1] - first name : checks if first letter of fname and email are the same
    // if((fName.length >= 2) && (fName.charAt(0) === email.charAt(0))){
    //     fNamePASS = true
    // }else{
    //     console.log('2: Check email and/or first name again. Then re-enter Verification command')
    // }

    // //checks arg[2] - last name : checks if last name is in email
    // if((lName.length >= 2) && (email.includes(lName))){
    //     lNamePASS = true
    // }else{
    //     console.log('3: Check last name again. Then re-enter Verification command')
    // }

    // //checks arg[3]
    // if ((studentID.length == 4) && (email.includes(studentID))){
    //     studentIdPASS = true
    // }else{
    //     console.log('4: Check Student ID again. Then re-enter Verification command')
    // }

    // //check for everything in place
    // let emailCheck = fName.charAt(0) + lName + studentID + '@floridapoly.edu'
    // if ((emailCheck === email)){
    //     console.log(emailCheck === email)
    //     console.log('ALL TRUE')
    // }
    


    // // if (emailPASS && fNamePASS && lNamePASS && idPASS){
    // // }

    // console.log('email:' + emailPASS)
    // console.log('firstName:' + fNamePASS)
    // console.log('lastName:' + lNamePASS)
    // console.log('id:' + studentIdPASS)

//
// let list = [
//     'CREATE_INSTANT_INVITE', 'KICK_MEMBERS',
//     'BAN_MEMBERS',           'ADMINISTRATOR',
//     'MANAGE_CHANNELS',       'MANAGE_GUILD',
//     'ADD_REACTIONS',         'VIEW_AUDIT_LOG',
//     'PRIORITY_SPEAKER',      'STREAM',
//     'VIEW_CHANNEL',          'SEND_MESSAGES',
//     'SEND_TTS_MESSAGES',     'MANAGE_MESSAGES',
//     'EMBED_LINKS',           'ATTACH_FILES',
//     'READ_MESSAGE_HISTORY',  'MENTION_EVERYONE',
//     'USE_EXTERNAL_EMOJIS',   'VIEW_GUILD_INSIGHTS',
//     'CONNECT',               'SPEAK',
//     'MUTE_MEMBERS',          'DEAFEN_MEMBERS',
//     'MOVE_MEMBERS',          'USE_VAD',
//     'CHANGE_NICKNAME',       'MANAGE_NICKNAMES',
//     'MANAGE_ROLES',          'MANAGE_WEBHOOKS',
//     'MANAGE_EMOJIS'
//   ]

//   for (x in list){
//       console.log(`${list[x]} \t\t` + reaction.message.guild.member(reaction.message.author).hasPermission(x))
//   }

// //NEW SEARCH using client info
// let guildTEST = client.guilds.cache.find(guild => guild.name === config.server)
// let memberTEST = guildTEST.members.cache.find(member => member.id === user.id)
// let roleTEST = memberTEST.roles.cache.some(role => role.id === memberRole.id)
// console.log('----------------------')
// console.log(guildTEST)
// console.log('----------------------')
// console.log(memberTEST)
// console.log('----------------------')
// console.log(roleTEST)
// console.log('----------------------')

                    // let msg = await reaction.message.fetch();
                    // const userReactions = await msg.reactions.cache.filter(reaction => reaction.users.cache.has(member.id));
                        
                    // //it removes all reactions that was reacted (can be many selected)
                    // for (const react of userReactions.values()) {
                    //     await react.users.remove(member.id);
                    //     console.info('ALL Reactions Removed')
                    // }

//
//