/*  
List of TODOs
[]  Join Server startup widow
[]  Have Bot Message you for verification request (for Student ROLE)
[]  
[]  If error occures in CODY, message error and delete two messages.
[]  Add new emojis fast.
[]  
[]  
[]  
[]  
*/    
    
    
    // Accounces that to specific channel/user that it is online.
    //var channelID = config.testingChat;
    var userID = config.owner;
    var hello = 'TESTING MODE: on Computer!\n💙💙💙';
    //client.channels.cache.get(channelID).send(hello);
    client.users.cache.get(userID).send(hello);



    console.log(args == '');
    console.log(args.length == 0);
    console.log(parseInt(args))
        // if ( (isNaN(args) && args.length == 0) || x == 0)  x = 1:

        // var hasName = (name === 'true') ? 'Y' :'N';

        //RECENT MESSAGE INFO for TESTING
//    console.log('MESSAGE: ' + message);   //returns message ID
//    console.log('MESSAGE.edits: ' + message.edits);     //returns attributes of message and channel
//    console.log('TYPE: '+ typeof message);

   
const channelID = message.channel;          //Channel ID
const channelName = message.channel.name;   //Channel Name


            
            // message.channel.send(fileText)
            // .then(() => msg.react('1️⃣'))
            // .then(() => msg.react('2️⃣'))
            // .then(() => msg.react('3️⃣'))
            // .then(() => msg.react('4️⃣'))
            // .then(() => msg.react('5️⃣'))
            // .then(() => msg.react('6️⃣'))
            // .then(() => msg.react('7️⃣'))
            // .then(() => msg.react('8️⃣'))
            // .then(() => msg.react('9️⃣'))
            // .then(() => msg.react('🔟'))
            // .then(() => msg.react(customEmoji2))
                  // .catch(() => console.error('One of the emojis failed to react.'));
                  


                //   switch (fileName) {
                //     case 'welcome':
                //     case 'rules':
                //       //inserts emoji
                //       message.channel.send(fileText)
                //       .then(() => message.react('🍊'))
                //             .then(() => message.react('🍇'))
                //             .catch(() => console.error('One of the emojis failed to react.'));
                      
                //       //message.react('👍');
                //       break;
                //     case 'registration':
                //       //inserts custom emoji
                //       const customEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'PhoenixPride');
                      
                //       message.channel.send(fileText)
                //       .then(() => message.react('🍊'))
                //       .then(() => message.react('🍇'))
                //       .then(() => message.react(customEmoji))
                //             .catch(() => console.error('One of the emojis failed to react.'));
                      
                      
                //       messsage.react(customEmoji);
                //       break;
                //     case 'channels':
                //     case 'connect_with_us':
                //     case 'test':
          
                //       const customEmoji2 = message.guild.emojis.cache.find(emoji => emoji.name === 'PhoenixPride');
          
          
                //       message.channel.send(fileText).then{react(customEmoji2)};
          
                //       break;
                //     default:
                //     console.log('fileName does not match cases. Update code to include new channel');
                //     };