const { reverseLookup, bulkReverseLookup, resolveName } = require('./src/index');

async function runTests() {
  const testAddress = "neutron167ucsyj55sxh3vfsa000qs27vddepl0yyrwuww";
  const testAddresses = [
    "neutron1m9l358xunhhwds0568za49mzhvuxx9ux8xafx2",
    "neutron167ucsyj55sxh3vfsa000qs27vddepl0yyrwuww"
  ];

  const singleResult = await reverseLookup(testAddress);
  console.log(`${testAddress} --> ${singleResult || 'NONE'}`);


  const nameResult = await resolveName("Deploydon");
  console.log("Name result:", nameResult);
  
  console.log("Bulk Reverse Lookup:")
  const bulkResults = await bulkReverseLookup(testAddresses);
  testAddresses.forEach((address, index) => {
    console.log(`${address} --> ${bulkResults[index] || 'NONE'}`);
  });
}

runTests().catch(console.error);