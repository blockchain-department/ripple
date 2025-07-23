// step1_connect.js

const xrpl = require('xrpl');

async function main() {
  // Connect to XRP Testnet
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  console.log('⏳ Connecting to XRP Testnet...');
  await client.connect();
  console.log('✅ Connected!');

  // Load issuer wallet using secret key
  const issuerSecret = 'sEdTh9Z5e1a5peVxHW2kSUPhbK4wkrE';
  const issuerWallet = xrpl.Wallet.fromSeed(issuerSecret);
  console.log(`👤 Issuer Wallet Address: ${issuerWallet.address}`);

  // Fetch and show XRP balance
  const response = await client.request({
    command: 'account_info',
    account: issuerWallet.address
  });

  const balance = response.result.account_data.Balance;
  console.log(`💰 XRP Balance: ${parseInt(balance) / 1_000_000} XRP`);

  await client.disconnect();
  console.log('🔌 Disconnected from Testnet');
}

main();
