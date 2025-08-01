const redis=require('redis');

const client = redis.createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function run() {
  await client.connect();

  // Step 1: Initial balance set karo
  await client.set('student:1:wallet', 50);
  await client.set('student:2:wallet', 50);
  await client.set('student:3:wallet', 50);
  await client.set('student:4:wallet', 50);
  await client.set('student:5:wallet', 50);

  console.log('\nInitial Balances:');
  for (let i = 1; i <= 5; i++) {
    console.log(`Student ${i}: ₹${await client.get(`student:${i}:wallet`)}`);
  }

  // Step 2: Pipeline banao
  const pipeline = client.multi();

  for (let i = 1; i <= 5; i++) {
    pipeline.incrBy(`student:${i}:wallet`, 10); // ₹10 cashback
  }

  const results = await pipeline.exec();
  console.log('\nPipeline Results:', results);

  console.log('\nUpdated Balances:');
  for (let i = 1; i <= 5; i++) {
    console.log(`Student ${i}: ₹${await client.get(`student:${i}:wallet`)}`);
  }

  await client.quit();
}

run();
