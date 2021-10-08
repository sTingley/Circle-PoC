const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const {
  createCryptoWallet
} = require('../../src/server.js');

const cryptoWallet;
const depositAddress; //Could be many later

Given('I have a valid Circle blockchain wallet', async () => {
  cryptoWallet = await createCryptoWallet("testSuite");
  assert(cryptoWallet.walletId.length > 0);
});

Given('I have a deposit address for my Circle blockchain wallet', async () => {
  depositAddress = await generateDepositAddress(cryptoWallet.walletId, "USD", "ETH");
	assert(depositAddress.address.length > 0);
	console.log("deposit address: " + depositAddress.address);
});

When('I receive ${int} external funds into my Circle address (wallet)', async (amount) => {
	//initiate trxn of token transfer of USDC (Goerli network) or ETH
	//Web3 token transfer
});

Then('My balance should increase by ${int}', function () {
  return true;
});
