// /functions/alchemyapi.js
const axios = require("axios");

exports.handler = async function (event) {
  console.log('Proxy function called:', event.body);
  const { ALCHEMY_API_KEY } = process.env;
  const apiUrl = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
  const { method, params } = JSON.parse(event.body);

  try {
    const response = await axios.post(apiUrl, {
      jsonrpc: "2.0",
      id: 0,
      method,
      params,
    });

    console.log('API response:', response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};