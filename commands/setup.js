
module.exports = {
    name: 'setup',
    description: "Initial setup of channel!",
    execute(message, args, Discord){
        
        console.log('\n\nReady for SETUP command\n\n');

        //replace or update message in specific channel

        
        // gets channel's name and get's files/message based on channel name


        // set up banner, then message
        const attachment = new Discord.MessageAttachment('././setup/welcome.gif');
        message.channel.send(attachment).then(msg => {
            //msg.react('🎉');
            setTimeout(function(){
               message.channel.send('INSERT MESSAGE HERE');
            }, 1000);
          });

        //message.channel.send('TEST 1');
    }
}