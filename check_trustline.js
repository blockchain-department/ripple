// check_trustline.js

const xrpl = require('xrpl');

async function checkTrustline() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();


  const receiverAddress = 'rHv4fwgHttBjXV9uGnvgQKK4ehh8dRq16R'; 
  const issuerAddress = 'rJ28kH8EVuDowEZ3Vw2NksACV2P24YUJYZ';

  const currencyCode = 'ZTK';

  const trustlines = await client.request({
    command: 'account_lines',
    account: receiverAddress
  });

  const exists = trustlines.result.lines.some(line =>
    line.currency === currencyCode && line.account === issuerAddress
  );

  console.log(`Trustline exists: ${exists ? 'YES' : 'NO'}`);

  await client.disconnect();
}

checkTrustline();
