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
  let accounts = [
    { id: '6375b009-1ecb-49cd-b530-984c5f68a204' },
    { id: 'd96aeb30-398e-47dd-95eb-7f2e47cfb0e5' },
    { id: '8f136b37-7825-4d80-9656-8c17e0fbc51a' }
  ];
  return accounts;
};

const getCustomerACHAccounts = async () => {
  let accounts = [
    { id: '18707089-4831-414b-be68-71ef85606101' },
    { id: 'f944115e-0c42-4ce5-8423-6b5caf8f5720' },
    { id: 'baac18c0-c2e0-49dd-869b-28048b7c093a' }
  ];
  return accounts;
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
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const sendACHPayout = async (amount, accountId) => {
  const idempotencyKey = uuid();
  try {
    let response = await axios.post(
      'https://api-sandbox.circle.com/v1/payouts',
      {
        idempotencyKey: idempotencyKey,
        destination: {
          type: 'ach',
          id: accountId
        },
        amount: {
          currency: 'USD',
          amount: amount
        },
        metadata: {
          beneficiaryEmail: 'satoshi@circle.com'
        }
      },
      config
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getPayoutStatus = async (payoutId) => {
  try {
    let response = await axios.get(`https://api-sandbox.circle.com/v1/payouts/${payoutId}`, config);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const createMockACHAccount = async () => {
  try {
    let response = await axios.post(
      'https://api-sandbox.circle.com/v1/mocks/ach/accounts',
      {
        account: {
          accountNumber: '123456789',
          routingNumber: '011000028',
          description: 'Mock ACH account'
        },
        balance: {
          amount: '1000.00',
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

module.exports = {
  createCryptoWallet,
  generateDepositAddress,
  getMasterWalletId,
  getMasterWalletBalance,
  getBusinessBankAccounts,
  getCustomerWireAccounts,
  fundMasterAccount,
  sendWirePayout,
  sendACHPayout,
  getPayoutStatus,
  createMockACHAccount,
  getCustomerACHAccounts
};
