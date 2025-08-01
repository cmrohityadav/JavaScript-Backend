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


        // Pipelining & transactions
        // MULTI = "Batch banana shuru karo"
        // EXEC = "Jo batch banaya hai, ab ek saath chala do"

        //    normal
        // SET a 1   --> Redis ne set kar diya
        // SET b 2   --> Redis ne set kar diya
        // GET a     --> Redis ne a de diya


        // MULTI/EXEC:
        // MULTI           --> Redis: "Ok, batch bana raha hoon"
        // SET a 1         --> Redis: "Ok, note kar liya"
        // SET b 2         --> Redis: "Ok, note kar liya"
        // GET a           --> Redis: "Ok, note kar liya"
        // EXEC            --> Redis: "Ab sab ek saath chala diya"


      /*  const multi=client.multi();

        multi.set('key-transaction1','value1');
        multi.set('key-transaction2','value2');

        multi.get('key-transaction1'); 
        multi.get('key-transaction2'); 

        const result=await multi.exec();
        console.log("result transactions : ")
        console.log(result);


        const pipeline= client.multi();

        multi.set('key-pipeline1','value1');
        multi.set('key-pipeline2','value2');
        multi.get('key-pipeline1');
        multi.get('key-pipeline2');

        const pipelineResult= await multi.exec();
        console.log('pipeline result: ');
        console.log(pipelineResult)


        // batch data operation

        const pipeLineOne= client.multi();

        for(let i=0;i<1000;i++){
            pipeline.set(`user: ${i} : action `,`Action ${i}`);
        }

        await pipeLineOne.exec();

        const dummyExample= client.multi();
        multi.decrBy('account:1234:balance',100);
        multi.incrBy('account:0000:balance',100);

        const finalResults= await multi.exec();
        
        */


        // Transaction
        const multi = client.multi();
        multi.set('key-transaction1', 'value1');
        multi.set('key-transaction2', 'value2');
        multi.get('key-transaction1');
        multi.get('key-transaction2');
        const result = await multi.exec();
        console.log(result);

        // Pipeline
        const pipeline = client.multi(); // yeh naya pipeline hai
        pipeline.set('key-pipeline1', 'value1');
        pipeline.set('key-pipeline2', 'value2');
        pipeline.get('key-pipeline1');
        pipeline.get('key-pipeline2');
        const pipelineResult = await pipeline.exec();  // 👈 yaha `pipeline.exec()`
        console.log(pipelineResult);

        // Batch data operation
        const pipeLineOne = client.multi();
        for (let i = 0; i < 1000; i++) {
        pipeLineOne.set(`user:${i}:action`, `Action ${i}`);
        }
        await pipeLineOne.exec();

        // Dummy transaction
        const dummyExample = client.multi();
        dummyExample.decrBy('account:1234:balance', 100);
        dummyExample.incrBy('account:0000:balance', 100);
        const finalResults = await dummyExample.exec();
        console.log(finalResults);

    } catch (error) {
        console.error(error)
    }finally{
        client.quit();
    }
} 

learningPubSub();