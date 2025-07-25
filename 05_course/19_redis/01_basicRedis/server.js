const redis= require('redis');

const client=redis.createClient({
    host:'localhost',
    port:6379,
});


//evenet listner
client.on('error',(err)=>console.log(`Redis client error occured! `,err));

async function testRedisConnection(){
    try {
        await client.connect();
        console.log(`Connected to redis`);

        await client.set("key","value");

        const extractKeyValue=await client.get('key');

        console.log(`key value : `,extractKeyValue);

        await client.set("name","Rohit Yadav");

        console.log(`Value of name key : ${await client.get("name")}`);

        
    } catch (error) {
        console.error(error);
    }finally{
        await client.quit();
    }
}

testRedisConnection()