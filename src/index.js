const { useReverseLookup } = require("./hooks/useReverseLookup");
const { useBulkReverseLookup } = require("./hooks/useBulkReverseLookup");

const { 
  reverseLookup, 
  bulkReverseLookup,
} = require("./api");


module.exports = {
  useReverseLookup,
  useBulkReverseLookup,
  reverseLookup,
  bulkReverseLookup,
};