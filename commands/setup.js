const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

//this function adds reactions in specific order
const addReactions = (message, args, last) => {
  console.log('STARTING REACTIONS')
  console.log(args)

  if (args[0].length == 2){
    console.log(args[0] + ' => ' + typeof args[0])
    last.react(args[0])
  }else{
    const customEmoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0])
    last.react(customEmoji)
  }

  args.shift()
  if (args.length > 0) {
    console.log(args[0] + ' => ' + typeof args[0])
    setTimeout(() => addReactions(message, args, last), 750)
  }
}

var run = (message, args) => {

  //gets name of channel and REGEX emoji
  const emojiPattern = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+/g //identifies all emojis (not custom)
  const fileName =  message.channel.name.replace(emojiPattern, '');

  //post .gif banner, .txt message, and emojis (if needed)
  const attachment = new Discord.MessageAttachment('././setup/' + fileName + '.gif');
  message.channel.send(attachment).then(msg => {
    var fileText = fs.readFileSync('././setup/' + fileName + '.txt', 'utf8');
      
    setTimeout(function(){
    message.channel.send(fileText)
    .then(() => {
      if (20 >= args.length > 0){
        const last = message.channel.lastMessage;
        const excessPattern = /<:|(:+[0-9]+>)/g
            
        //trims any string to Name only
        for (arg in args){
          args[arg] = args[arg].replace(excessPattern, '');
        }

        addReactions(message, args, last);
      }
    })
    }, 1000)
  });
  message.delete({timeout: 3000})
}

module.exports = {
    name: 'setup',
    aliases: ["reborn"], //added something new...
    description: "Initial setup of channel!",
    execute(message, args){
        
        console.log('\nReady for SETUP command\n');
        run(message, args);

        //replace or update message in specific channel (COMMING SOON)
        // gets channel's name and get's files/message based on channel name
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
    }
}