const xrpl = require("xrpl");

async function fetchBalances() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const address = "rpGLibQYf9jXp3sRGHchkhn4u6KEHiUMuj";

  //Fetch native XRP balance
  const accountInfo = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated"
  });

  const balanceDrops = accountInfo.result.account_data.Balance;
  const balanceXRP = xrpl.dropsToXrp(balanceDrops);
  console.log(`XRP Balance for ${address}: ${balanceXRP} XRP`);

  // Fetch balances of all trustlines (issued currencies like USDC)
  const linesInfo = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated"
  });

  if (linesInfo.result.lines.length === 0) {
    console.log("ℹ No issued tokens held via trustlines.");
  } else {
    console.log(`Trustline Balances for ${address}:`);
    for (const line of linesInfo.result.lines) {
      console.log(`  • ${line.balance} ${line.currency}`);
    }
  }

  await client.disconnect();
}

fetchBalances();
