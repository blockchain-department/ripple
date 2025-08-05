const xrpl = require("xrpl");

async function checkTrustline() {
  // Connect to the XRPL Testnet
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  // Replace with the target XRPL wallet address
  const address = "rpGLibQYf9jXp3sRGHchkhn4u6KEHiUMuj";

  // Define token info
  const currencyCode = "USD";
  const issuerAddress = "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq";  // Bitstamp issuer

  // Fetch account trustlines
  const response = await client.request({
    command: "account_lines",
    account: address
  });

  const lines = response.result.lines;

  const hasTrustline = lines.some(line =>
    line.account === issuerAddress && line.currency === currencyCode
  );

  if (hasTrustline) {
    console.log(`✅ Trustline exists for ${currencyCode} issued by ${issuerAddress}`);
  } else {
    console.log(`❌ No trustline found for ${currencyCode} from ${issuerAddress}`);
  }

  await client.disconnect();
}

checkTrustline();
