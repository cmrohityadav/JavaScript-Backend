const redis=require('redis');

const client=redis.createClient({
    host:'localhost',
    port:6379,
});

client.on('error',(error)=>{
    console.log(`Error while redis client creating: ${error}`)
});

async function redisDataStructure(){
    try {
        await client.connect();
        
        // String: set,get,mset,mget
        await client.del('notes');
        await client.mSet(["user:name",'cmrohityadav','user:age',"24"]);

        const [name,age]=await client.mGet(["user:name",'user:age']);
        console.log(`mget values=> name: ${name} , age : ${age}`);



        // Lists -> LPUSH (Left), RPUSH (Right), LRANGE, LPOP, RPOP
        
        await client.lPush('notes',['notes 1','notes 2','notes 3','notes 4']);

        const extractNotes=await client.lRange('notes',0,-1);

        console.log(`extract Notes List: ${extractNotes}`);


        const firstNote=await client.lPop('notes');
        console.log(`first note removed:  ${firstNote}`);

        const secondNote=await client.lPop('notes');
        console.log(`second note removed:  ${secondNote}`);

    
        console.log(`extract Notes List: ${extractNotes}`);

        // ❌ DON'T reuse old variable
        // ✅ Fetch fresh
        const updatedNotes = await client.lRange('notes', 0, -1);
        console.log(`extract Notes List AFTER pops: ${updatedNotes}`);





        // SETS -> SADD,SMEMBERS,SISMEMBER,SREM

        await client.sAdd("user:nickname",["rahul","yadav","yaduvansi","removeMe"]);
        const extractedUserNickNameSet= await client.sMembers("user:nickname");
        console.log(`Extracted set for nickname: ${extractedUserNickNameSet}`)

        const isYadavPresent=await client.sIsMember("user:nickname","yadav");
        console.log(`isYadavPresent : ${isYadavPresent}`);

        const removedSetitem=await client.sRem('user:nickname',['removeMe','yaduvansi']);
        console.log(`removed set item : ${removedSetitem}`);



        // SORTED SETS -> ZADD,ZRANGE,ZRANK,ZREM


        

    } catch (error) {
        console.error(error);
    }finally{
      await  client.quit()
    }
}

redisDataStructure();