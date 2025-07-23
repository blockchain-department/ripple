// step3_create_trustline.js

const xrpl = require('xrpl');

async function main() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  // Receiver wallet (who wants to receive ZTK)
  const receiverWallet = xrpl.Wallet.fromSeed('sEd7Aw5YvgX4NApj9tNumdiQf9QvdZe');

  // Issuer address (who created ZTK)
  const issuerAddress = 'rJ28kH8EVuDowEZ3Vw2NksACV2P24YUJYZ';

  // Build the trustline transaction
  const trustSetTx = {
    TransactionType: 'TrustSet',
    Account: receiverWallet.address,
    LimitAmount: {
      currency: 'ZTK',
      issuer: issuerAddress,
      value: '1000'  // Receiver allows holding up to 1000 ZTK
    }
  }

  console.log('⏳ Preparing trustline transaction...');
  const prepared = await client.autofill(trustSetTx);
  const signed = receiverWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log('✅ Trustline Transaction Result:\n', result.result.meta.TransactionResult);

  await client.disconnect();
}

main();
