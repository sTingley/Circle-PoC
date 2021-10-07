const axios = require('axios');
const routes = require('./routes.json');
const { v4: uuid } = require('uuid');

const config = {
  headers: {
    Authorization: `Bearer QVBJX0tFWTo0NTE2ZWRmYzUzNDU1MjUwZTY3ZDkxYWJlZWRkMjlkYzo4ZGM4Njc0YzMyMWE5MmE5NDk1ZTcxNjMyNDYxMTI1ZQ==`
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
  getMasterWalletId,
  getMasterWalletBalance,
  getBusinessBankAccounts,
  getCustomerWireAccounts,
  fundMasterAccount,
  sendWirePayout
};
