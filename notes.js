/*  
List of TODOs
[]  Join Server startup widow
[]  Have Bot Message you for verification request (for Student ROLE)
[]  
[]  If error occures in CODY, message error and delete two messages.
[]  
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