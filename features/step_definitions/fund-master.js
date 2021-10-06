const { Given, When, Then } = require('@cucumber/cucumber');
const { getMasterWalletId, getMasterWalletBalance } = require('../../src/server.js');
const assert = require('assert');

Given('I have a valid Circle Master Wallet', async () => {
  // Write code here that turns the phrase above into concrete actions
  this.masterWalletId = await getMasterWalletId();
  this.masterBalance = await getMasterWalletBalance();
  assert(this.masterWalletId.length > 0);
  assert(this.masterBalance.length > 0);
});

When('I wire ${int} from a Bank Account', function (amount) {
  return 'pending';
});

Then('the Circle Master Wallet balance should increase by ${int}', function (int) {
  // Then('the Circle Master Wallet balance should increase by ${float}', function (float) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
