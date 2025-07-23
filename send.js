// step4_send_ztk.js

const xrpl = require('xrpl');

async function main() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  // Load Issuer wallet (the one sending ZTK)
  const issuerWallet = xrpl.Wallet.fromSeed('sEdTh9Z5e1a5peVxHW2kSUPhbK4wkrE');

  // Receiver address (who set the trustline)
  const receiverAddress = 'rHv4fwgHttBjXV9uGnvgQKK4ehh8dRq16R';

  // Define the token amount and currency
  const paymentTx = {
    TransactionType: "Payment",
    Account: issuerWallet.address,
    Destination: receiverAddress,
    Amount: {
      currency: "ZTK",
      value: "100", // Send 100 ZTK
      issuer: issuerWallet.address
    }
  };

  console.log('⏳ Preparing token payment transaction...');
  const prepared = await client.autofill(paymentTx);
  const signed = issuerWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log('✅ ZTK Transfer Result:', result.result.meta.TransactionResult);

  await client.disconnect();
}

main();
