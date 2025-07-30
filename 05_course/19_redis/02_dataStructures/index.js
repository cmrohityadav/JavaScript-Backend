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

        await client.zAdd('cart',[
            {
                score:100,
                value:'cart 1'
            },
            {
                score:150,
                value:'cart 2'
            },
            {
                score:10,
                value:'cart 3'
            }
        ])

        const getCartItem= await client.zRange('cart',0,-1);

        console.log(`getCartItem : ${getCartItem}`);

        const extractAllCartItemWithScore=await client.zRangeWithScores('cart',0,-1);

        console.log(`extractAllCartItemWithScore: `);
        console.log(extractAllCartItemWithScore);


        const cartTwoRank= await client.zRank('cart','cart 2');
        console.log(`cartTwoRank : `);
        console.log(cartTwoRank);




        // Hashes like map -> HSET,HGET,HGETALL,HDEL

        await client.hSet('product:1',{
            name:'Product 1',
            description:'product one description',
            rating:'5'
        });

        const getProductRating=await client.hGet('product:1','rating');
        console.log(`Product Rating: ${getProductRating}`)


        const getProductDetails= await client.hGetAll('product:1');
        console.log(`getProductDetail: `,getProductDetails);

        console.log("Deleting Product detail");

        await client.hDel('product:1','rating');

        console.log(`Deleting rating and updated :`);

        const updatedGetProductDetails= await client.hGetAll('product:1');
        console.log(updatedGetProductDetails);





        

    } catch (error) {
        console.error(error);
    }finally{
      await  client.quit()
    }
}

redisDataStructure();