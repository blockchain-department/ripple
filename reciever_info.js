// step2b_receiver_info.js

const xrpl = require('xrpl');

async function main() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  // Load Receiver wallet
  const receiverWallet = xrpl.Wallet.fromSeed('sEd7Aw5YvgX4NApj9tNumdiQf9QvdZe');
  console.log(`🔎 Checking receiver account: ${receiverWallet.address}`);

  // Request account info
  const response = await client.request({
    command: 'account_info',
    account: receiverWallet.address
  });

  const info = response.result.account_data;

  console.log('\n📊 Receiver Account Info:');
  console.log(`➡️ XRP Balance      : ${parseInt(info.Balance) / 1_000_000} XRP`);
  console.log(`➡️ Sequence Number  : ${info.Sequence}`);
  console.log(`➡️ Flags            : ${info.Flags}`);
  console.log(`➡️ Owner Count      : ${info.OwnerCount}`);
  console.log(`➡️ Account Data JSON:\n`, info);

  await client.disconnect();
}

main();
