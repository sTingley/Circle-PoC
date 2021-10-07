const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const {
  getMasterWalletId,
  getMasterWalletBalance,
  getBusinessBankAccounts,
  fundMasterAccount
} = require('../../src/server.js');

let masterWalletId;
let originalTotalBalance;
let businessBankAccounts;
let paymentResponse;

Given('I have a valid Circle Master Wallet', async () => {
  masterWalletId = await getMasterWalletId();
  const masterBalance = await getMasterWalletBalance();
  originalTotalBalance =
    Number(masterBalance.available[0].amount) + Number(masterBalance.unsettled[0].amount);

  assert(masterWalletId.length > 0);
  assert(masterBalance.available[0].amount.length > 0);
});

Given('I have a linked Bank Account', async () => {
  businessBankAccounts = await getBusinessBankAccounts();
  assert(businessBankAccounts[0].id.length > 0);
});

When('I wire ${int} from the Bank Account', async (amount) => {
  paymentResponse = await fundMasterAccount(businessBankAccounts[0].trackingRef, amount);
  assert(businessBankAccounts[0].trackingRef === paymentResponse.trackingRef);
});

Then('the payment status is pending', function () {
  assert(paymentResponse.status === 'pending');
});
