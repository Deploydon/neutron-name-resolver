const { useState, useEffect, useCallback } = require("react");
const { bulkReverseLookup } = require("../api");

function useBulkReverseLookup(addresses = [], options = {}) {
  const {
    rpc,
    enabled = true,
    refetchInterval = 1000 * 30,
  } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!addresses || addresses.length === 0 || !enabled) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await bulkReverseLookup(addresses, rpc);
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [addresses, rpc, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || !addresses || addresses.length === 0 || !refetchInterval) {
      return;
    }

    const interval = setInterval(() => {
      fetchData();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [fetchData, enabled, addresses, refetchInterval]);

  return {
    value: data,
    isLoading,
    error,
    isError: !!error,
    refetch: fetchData
  };
}

module.exports = { useBulkReverseLookup }; 