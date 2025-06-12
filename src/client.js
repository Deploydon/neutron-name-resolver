const { CosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const { DEFAULT_RPC } = require("./config");

async function getReadOnlyClient(rpc = DEFAULT_RPC) {
  try {
    const client = await CosmWasmClient.connect(rpc);
    return client;
  } catch (error) {
    console.error("Failed to connect to RPC:", error);
    throw error;
  }
}

module.exports = {
  getReadOnlyClient,
}; 