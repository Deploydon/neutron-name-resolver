const { reverseLookup, bulkReverseLookup } = require('./src/index');

async function runTests() {
  const testAddress = "neutron1m9l358xunhhwds0568za49mzhvuxx9ux8xafx3";
  const testAddresses = [
    "neutron1m9l358xunhhwds0568za49mzhvuxx9ux8xafx2",
    "neutron1swap4q9fu42f2l5sm9qwneu62rl9zmx473wy6q",
    "neutron1gay5y8ek556xx2zucjhdvsdt5g5hynq8ey8k94"
  ];

  const singleResult = await reverseLookup(testAddress);
  console.log(`${testAddress} --> ${singleResult || 'NONE'}`);
  
  console.log("Bulk Reverse Lookup:")
  const bulkResults = await bulkReverseLookup(testAddresses);
  testAddresses.forEach((address, index) => {
    console.log(`${address} --> ${bulkResults[index] || 'NONE'}`);
  });
}

runTests().catch(console.error);