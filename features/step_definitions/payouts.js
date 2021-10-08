const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { getMasterWalletBalance, getCustomerACHAccounts, sendACHPayout } = require('../../src/server.js');

let originalTotalBalance;
let bankAccounts;
let payouts = [];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

Given("{int} Investor Bank Accounts are linked to END's Circle Account", async (numAccounts) => {
  bankAccounts = await getCustomerACHAccounts();
  console.log('Hello..................');
  assert(bankAccounts.length >= numAccounts);
});

Given('we know the initial END Circle Account balance', async () => {
  const currentBalance = await getMasterWalletBalance();
  originalTotalBalance =
    Number(currentBalance.available[0].amount) + Number(currentBalance.unsettled[0].amount);
  assert(currentBalance.available[0].amount.length > 0);
});

When(
  'END initiates a ${int} payout to each of the {int} Investor Bank Accounts',
  async (amount, numAccounts) => {
    for (let i = 0; i < numAccounts; i++) {
      payouts[i] = await sendACHPayout(amount, bankAccounts[0].id);
    }
  }
);

Then(
  'the END Circle Account balance should be ${int} less than the initial balance',
  { timeout: 30 * 1000 },
  async (amount) => {
    // Give payouts time to be deducted from balance
    let payoutsComplete = false;
    let attempts = 0;
    let newTotalBalance;
    while (!payoutsComplete) {
      attempts++;
      console.log(`Polling account balance. Attempt #${attempts}`);
      const currentBalance = await getMasterWalletBalance();
      newTotalBalance =
        Number(currentBalance.available[0].amount) + Number(currentBalance.unsettled[0].amount);
      console.log('originalTotalBalance:', originalTotalBalance);
      console.log('newTotalBalance:', newTotalBalance);

      payoutsComplete = true;
      if (newTotalBalance === originalTotalBalance) {
        payoutsComplete = false;
      }
      // Wait 3 seconds before polling again
      console.log(`Waiting 3 sec before trying again`);
      await sleep(3000);
    }
    assert(newTotalBalance === originalTotalBalance - amount);
  }
);
