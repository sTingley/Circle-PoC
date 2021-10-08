const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const {
  createCryptoWallet, generateDepositAddress
} = require('../../src/server.js');

let cryptoWallet;
let depositAddress; //Could be many addresses later

Given('ENDs Circle Account has a blockchain wallet created', async () => {
  cryptoWallet = await createCryptoWallet("testSuite");
  assert(cryptoWallet.walletId.length > 0);
});

Given('ENDs Circle blockchain wallet has a deposit address', async () => {
  depositAddress = await generateDepositAddress(cryptoWallet.walletId, "USD", "ETH");
	assert(depositAddress.address.length > 0);
	console.log("deposit address: " + depositAddress.address);
});

Given('The initial END Circle blockchain account balance is known', async () => {
  return true;
});

When('END receives a ${int} payment of USDC', async (amount) => {
	//initiate trxn of token transfer of USDC (Goerli network) or ETH
	//Web3 token transfer
  return true;
});

Then('ENDs Circle Account crypto account balance should increase by ${int}', function (amount) {
  return true;
});
