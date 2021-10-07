const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const {
  getMasterWalletId,
  getMasterWalletBalance,
  getCustomerWireAccounts,
  sendWirePayout
} = require('../../src/server.js');

let originalTotalBalance;
let bankAccounts;
let payouts = [];

Given("{int} Investor Bank Accounts are linked to END's Circle Account", async (numAccounts) => {
  bankAccounts = await getCustomerWireAccounts();
  assert(bankAccounts.length >= numAccounts);
});

Given('we know the initial END Circle Account balance', async () => {
  const masterBalance = await getMasterWalletBalance();
  originalTotalBalance =
    Number(masterBalance.available[0].amount) + Number(masterBalance.unsettled[0].amount);
  assert(masterBalance.available[0].amount.length > 0);
});

When(
  'END initiates a ${int} payment to each of the {int} Investor Bank Accounts',
  async (amount, numAccounts) => {
    for (let i = 0; i < numAccounts; i++) {
      payouts[i] = await sendWirePayout(amount, bankAccounts[0].id);
    }
  }
);

Then('the END Circle Account balance should decrease by ${int}', function (int) {
  return 'pending';
});
