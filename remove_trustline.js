const xrpl = require('xrpl');

async function main() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  // Receiver wallet (who created the trustline)
  const receiverWallet = xrpl.Wallet.fromSeed('sEd7Aw5YvgX4NApj9tNumdiQf9QvdZe');
  
  // Issuer address (who created ZTK)
  const issuerAddress = 'rJ28kH8EVuDowEZ3Vw2NksACV2P24YUJYZ';

  // Set limit to 0 to remove trustline
  const tx = {
    TransactionType: 'TrustSet',
    Account: receiverWallet.address,
    LimitAmount: {
      currency: 'ZTK',
      issuer: issuerAddress,
      value: '0'
    }
  };

  const prepared = await client.autofill(tx);
  const signed = receiverWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log('✅ Trustline Removal Result:', result.result.meta.TransactionResult);
  await client.disconnect();
}

main();
