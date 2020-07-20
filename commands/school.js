module.exports = {
    name: 'school',
    description: "This is a ping command!",
    execute(message, args){
        message.channel.send('```>https://www.floridapoly.edu```');
    }
}