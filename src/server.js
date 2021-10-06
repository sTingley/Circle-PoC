const axios = require('axios');
const routes = require('./routes.json');

const config = {
  headers: {
    Authorization: `Bearer QVBJX0tFWTo0NTE2ZWRmYzUzNDU1MjUwZTY3ZDkxYWJlZWRkMjlkYzo4ZGM4Njc0YzMyMWE5MmE5NDk1ZTcxNjMyNDYxMTI1ZQ==`
  }
};

const getMasterWalletId = async () => {
  try {
    let response = await axios.get('https://api-sandbox.circle.com/v1/balances', config);
    return response.data.data.payments.masterWalletId;
  } catch (error) {
    console.error(error);
  }
};

const getMasterWalletBalance = async () => {
  try {
    let response = await axios.get('https://api-sandbox.circle.com/v1/configuration', config);
    return response.data.data.available.amount;
  } catch (error) {
    console.error(error);
  }
};

const sendPayout = async (id) => {
  let obj = routes.sendPayout;

  try {
    let response = await axios.post(obj.route, obj.requestBody, config);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getCustomerWireAccounts = async () => {
  let accounts = [
    '82812979-ec98-4484-a9bf-c787532e53d9',
    'a30ad7b9-50b3-4a16-9ca4-4667c7e09d25',
    '0848fc18-adc7-448b-9b3e-00536da6454b'
  ];
  return accounts;
};

module.exports = {
  getMasterWalletId,
  getMasterWalletBalance,
  getCustomerWireAccounts,
  sendPayout
};
