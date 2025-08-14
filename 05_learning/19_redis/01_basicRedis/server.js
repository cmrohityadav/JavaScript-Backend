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




        //del
        await client.set('anykeydel',"any  value for del");

        console.log(`Value of key anykeydel: ${await client.get('anykeydel')}`);

        await client.del('anykeydel');

        console.log(`After Del : Value of  anykeydel: ${await client.get('anykeydel')}`);



        // increament

        await client.set("counter","100");

        const increamentCounter=await client.incr("counter");

        console.log(` after increament : ${await client.get("counter")}`);

        //decreament

         const decreamentCounter=await client.decr("counter");

        console.log(` after decreament : ${await client.get("counter")}`);


        
    } catch (error) {
        console.error(error);
    }finally{
        await client.quit();
    }
}

testRedisConnection()