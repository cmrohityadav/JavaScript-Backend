const redis=require('redis');
const client = redis.createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function run() {
  await client.connect();

  // Pehle A aur B ke balance set karo
  await client.set('wallet:A', 1000);
  await client.set('wallet:B', 500);

  console.log('A balance:', await client.get('wallet:A'));
  console.log('B balance:', await client.get('wallet:B'));

  // A se B ko ₹200 transfer karna hai
  const amount = 200;

  // 1️⃣ A ke balance ko WATCH karo
  await client.watch('wallet:A');

  // 2️⃣ Pehle dekho balance sufficient hai ya nahi
  const aBalance = parseInt(await client.get('wallet:A'));
  if (aBalance < amount) {
    console.log('Insufficient balance. Transaction failed.');
    await client.quit();
    return;
  }

  // 3️⃣ MULTI block banao
  const tx = client.multi();
  tx.decrBy('wallet:A', amount); // A se paisa ghatao
  tx.incrBy('wallet:B', amount); // B me paisa jodo

  // 4️⃣ EXEC karo
  const result = await tx.exec();

  if (result === null) {
    console.log('Transaction failed! Balance was changed by someone else.');
  } else {
    console.log('Transaction success:', result);
  }

  console.log('A balance:', await client.get('wallet:A'));
  console.log('B balance:', await client.get('wallet:B'));

  await client.quit();
}

run();
