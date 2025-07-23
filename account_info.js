// step2_account_info.js

const xrpl = require('xrpl');

async function main() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  // Load Issuer wallet
  const issuerWallet = xrpl.Wallet.fromSeed('sEdTh9Z5e1a5peVxHW2kSUPhbK4wkrE');
  console.log(`🔎 Checking account: ${issuerWallet.address}`);

  // Request account info
  const response = await client.request({
    command: 'account_info',
    account: issuerWallet.address
  });

  const info = response.result.account_data;

  console.log('\n📊 Account Information:');
  console.log(`➡️ XRP Balance      : ${parseInt(info.Balance) / 1_000_000} XRP`);
  console.log(`➡️ Sequence Number  : ${info.Sequence}`);
  console.log(`➡️ Flags            : ${info.Flags}`);
  console.log(`➡️ Owner Count      : ${info.OwnerCount}`);
  console.log(`➡️ Account Data JSON:\n`, info);

  await client.disconnect();
}

main();
