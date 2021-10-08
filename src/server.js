const axios = require('axios');
const routes = require('./routes.json');
const { v4: uuid } = require('uuid');

const config = {
  headers: {
    Authorization: `Bearer QVBJX0tFWTo0NTE2ZWRmYzUzNDU1MjUwZTY3ZDkxYWJlZWRkMjlkYzo4ZGM4Njc0YzMyMWE5MmE5NDk1ZTcxNjMyNDYxMTI1ZQ==`
  }
};

const createCryptoWallet = async (describe) => {
  try {
    obj = { idempotencyKey: uuid(), description: describe };
    let response = await axios.post('https://api-sandbox.circle.com/v1/wallets', obj, config);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

/*Generates a new blockchain address for a wallet for a given currency/chain pair.
Circle may reuse addresses on blockchains that support reuse. */
const generateDepositAddress = async (walletId, curr, ch) => {
  try {
    obj = { idempotencyKey: uuid(), currency: curr, chain: ch };
    console.log(obj.idempotencyKey);
    let response = await axios.post(
      /* 'https://api-sandbox.circle.com/v1/businessAccount/wallets/addresses/deposit',
          This URL is balid works but only accepts one idempotencyKey, 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'.
          Strange behavior; come back to this... */
      `https://api-sandbox.circle.com/v1/wallets/${walletId}/addresses`,
      obj,
      config
    );
    console.log(response.data.data.address);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getMasterWalletId = async () => {
  try {
    let response = await axios.get('https://api-sandbox.circle.com/v1/configuration', config);
    return response.data.data.payments.masterWalletId;
  } catch (error) {
    console.error(error);
  }
};

const getMasterWalletBalance = async () => {
  try {
    let response = await axios.get('https://api-sandbox.circle.com/v1/balances', config);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getBusinessBankAccounts = async () => {
  try {
    let response = await axios.get('https://api-sandbox.circle.com/v1/businessAccount/banks/wires', config);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getCustomerWireAccounts = async () => {
  try {
    let response = await axios.get('https://api-sandbox.circle.com/v1/banks/wires', config);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const fundMasterAccount = async (trackingRef, amount) => {
  try {
    let response = await axios.post(
      'https://api-sandbox.circle.com/v1/mocks/payments/wire',
      {
        trackingRef: trackingRef,
        amount: {
          amount: `${amount}`,
          currency: 'USD'
        }
      },
      config
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const sendWirePayout = async (amount, accountId) => {
  const idempotencyKey = uuid();
  try {
    let response = await axios.post(
      'https://api-sandbox.circle.com/v1/payouts',
      {
        idempotencyKey: idempotencyKey,
        destination: {
          type: 'wire',
          id: accountId
        },
        amount: {
          currency: 'USD',
          amount: amount
        },
        metadata: {
          beneficiaryEmail: 'john.smith@email.com'
        }
      },
      config
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createCryptoWallet,
  generateDepositAddress,
  getMasterWalletId,
  getMasterWalletBalance,
  getBusinessBankAccounts,
  getCustomerWireAccounts,
  fundMasterAccount,
  sendWirePayout
};
