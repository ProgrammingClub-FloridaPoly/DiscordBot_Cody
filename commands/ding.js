module.exports = {
    name: 'ding',
    description: "This is a ping command!",
    execute(message, args){
        message.channel.send('```>dong!\n>The witch is dead!```');
    }
}