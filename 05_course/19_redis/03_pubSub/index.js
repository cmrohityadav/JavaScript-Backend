// publiser -> send ->channel ->subscriber will consume it
const redis=require('redis');

const client=redis.createClient({
    host:'localhost',
    port:6379,
})

client.on('error',(error)=>{
    console.error(`Error while client connection: ${error}`);
});

async function learningPubSub(){
    try {

       await  client.connect();

       const subscriber= client.duplicate() //create a new connection but  share same connection

       await subscriber.connect();

       await subscriber.subscribe('anyChannelName',(message,channel)=>{
            console.log(`Received message from ${channel}: ${message}`);
       })

        //    publish message to the dummy channel
       await client.publish('anyChannelName','some dummy data from publiser');
       await client.publish('anyChannelName','New  dummy data again  from publiser');

       await new Promise((resolve)=>setTimeout(resolve,3000));

       await subscriber.unsubscribe('anyChannelName');

        await  subscriber.quit(); //close subscriber connection


        
    } catch (error) {
        console.error(error)
    }finally{
        client.quit();
    }
} 

learningPubSub();