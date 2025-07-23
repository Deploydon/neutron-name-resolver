const { useReverseLookup } = require("./hooks/useReverseLookup");
const { useBulkReverseLookup } = require("./hooks/useBulkReverseLookup");
const { useResolveName } = require("./hooks/useResolveName");
const { 
  reverseLookup, 
  bulkReverseLookup,
  resolveName
} = require("./api");


module.exports = {
  useReverseLookup,
  useBulkReverseLookup,
  reverseLookup,
  resolveName,
  bulkReverseLookup,
  useResolveName
}; 