const redis=require('redis');

const client = redis.createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function run() {
  await client.connect();

  await client.set('wallet:A', 1000);
  await client.set('wallet:B', 500);

  console.log('\nInitial:');
  console.log('A:', await client.get('wallet:A'));
  console.log('B:', await client.get('wallet:B'));

  const amount = 200;

  console.log('\n✅ Attempt 1: SUCCESS example');

  await client.watch('wallet:A');
  const aBal1 = parseInt(await client.get('wallet:A'));
  if (aBal1 < amount) {
    console.log('Not enough balance');
    await client.quit();
    return;
  }

  const tx1 = client.multi();
  tx1.decrBy('wallet:A', amount);
  tx1.incrBy('wallet:B', amount);

  const res1 = await tx1.exec();
  console.log('Transaction 1 success:', res1);

  console.log('A:', await client.get('wallet:A'));
  console.log('B:', await client.get('wallet:B'));

  console.log('\n❌ Attempt 2: FAIL example');

  await client.set('wallet:A', 1000);
  await client.set('wallet:B', 500);

  await client.watch('wallet:A');
  const aBal2 = parseInt(await client.get('wallet:A'));

  const otherClient = client.duplicate();
  await otherClient.connect();
  await otherClient.set('wallet:A', 999);
  await otherClient.quit();

  const tx2 = client.multi();
  tx2.decrBy('wallet:A', amount);
  tx2.incrBy('wallet:B', amount);

  try {
    const res2 = await tx2.exec();
    console.log('Transaction 2 success:', res2);
  } catch (err) {
    console.log('Transaction 2 failed:', err.message);
  }

  console.log('A:', await client.get('wallet:A'));
  console.log('B:', await client.get('wallet:B'));

  await client.quit();
}

run();
