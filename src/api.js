const { getReadOnlyClient } = require("./client");
const { CONTRACT } = require("./config");

async function reverseLookup(address, rpc) {
  if (!address) {
    throw new Error("Address is required");
  }
  
  try {
    const readClient = await getReadOnlyClient(rpc);
    const state = await readClient.queryContractSmart(CONTRACT, {
      reverse_lookup: { address: address },
    });
    return state;
  } catch (err) {
    console.error("Reverse lookup error:", err);
    throw err;
  }
}

async function resolveName(name, rpc) {
  if (!name) {
    throw new Error("Name is required");
  }
  
  try {
    const readClient = await getReadOnlyClient(rpc);
    const state = await readClient.queryContractSmart(CONTRACT, {
      resolve: { name: name },
    });
    return state;
  } catch (err) {
    console.error("Resolve name error:", err);
    throw err;
  }
}
async function bulkReverseLookup(addresses, rpc) {
  if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
    throw new Error("Addresses array is required and must not be empty");
  }
  
  try {
    const readClient = await getReadOnlyClient(rpc);
    const state = await readClient.queryContractSmart(CONTRACT, {
      bulk_reverse_lookup: { addresses: addresses },
    });
    return state;
  } catch (err) {
    console.error("Bulk reverse lookup error:", err);
    throw err;
  }
}

module.exports = {
  reverseLookup,
  bulkReverseLookup,
  resolveName
}; 