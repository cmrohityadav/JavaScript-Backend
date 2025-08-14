const Redis =require('ioredis');

const redis= new Redis();

async function ioRedisDemo(){
    try {
        await redis.set('thiskey','thisvalue ');
        const val= await redis.get('thiskey');
        console.log(val);

    } catch (error) {
        console.log(error);
    }finally{
        redis.quit()
    }
}

ioRedisDemo();