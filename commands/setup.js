const Discord = require('discord.js');
const client = new Discord.Client();

const text = 'TESTING TEXT INSERT';      // 1)string 2)string and emoji 3)textfile 4)textfile and emoji
const id = '';        // testing room

//this function adds reactions in specific order
const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if (reactions.length > 0) {
      setTimeout(() => addReactions(message, reactions), 750)
    }
  }

var run = async (message, args) => {
      const channel = await client.channels.fetch(id);

      channel.messages.fetch().then((messages) => {

        for (const m of messages) {
            console.log(m);
            //message[1].edit(text)
            //addReactions(message[1], reactions)
        }

        // if (messages.size === 0) {
        //     // Send a new message
        //     channel.send('NO MESSAGES FOUND')
        //     /* .then((message) => {
        //     addReactions(message, reactions)
        //     }) */
        //   } else {
        //     // Edit the existing message
        //     for (const m of messages) {
        //         console.log(m);
        //         //message[1].edit(text)
        //         //addReactions(message[1], reactions)
        //     }
        // }
    })
  }

module.exports = {
    name: 'setup',
    aliases: ["reborn"], //added something new...
    description: "Initial setup of channel!",
    execute(message, args){
        
        console.log('\nReady for SETUP command\n');
        run(message, args);

        //replace or update message in specific channel
        
        // gets channel's name and get's files/message based on channel name
        
        //TRYING TO GET CHANNEL IT CALLS
        //const text = 'INSERT MESSAGE';      // 1st message of channel
        // const id = '';    // ID of testing channel
        // var reactions = [];               // reactions in array

        //const channel =  await client.channels.fetch(id);

        // channel.messages.fetch().run().then((messages) => {
        //     if (messages.size === 0) {
        //         // Send a new message
        //         channel.send(text).then((message) => {
        //         addReactions(message, reactions)
        //         })
        //       } else {
        //         // Edit the existing message
        //         for (const m of messages) {
        //             console.log(m);
        //             message[1].edit(text)
        //             addReactions(message[1], reactions)
        //         }
        //     }
        // })

/*         // set up banner, then message
        const attachment = new Discord.MessageAttachment('././setup/welcome.gif');
        message.channel.send(attachment).then(msg => {
            //msg.react('🎉');
            setTimeout(function(){
               message.channel.send('INSERT MESSAGE HERE');
            }, 1000);
          }); */
    }
}