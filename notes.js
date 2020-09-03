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