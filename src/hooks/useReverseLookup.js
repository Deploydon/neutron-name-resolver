const { useState, useEffect, useCallback } = require("react");
const { reverseLookup } = require("../api");

function useReverseLookup(address, options = {}) {
  const {
    rpc,
    enabled = true,
    refetchInterval = 1000 * 30,
  } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!address || !enabled) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await reverseLookup(address, rpc);
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [address, rpc, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || !address || !refetchInterval) {
      return;
    }

    const interval = setInterval(() => {
      fetchData();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [fetchData, enabled, address, refetchInterval]);

  return {
    value: data,
    isLoading,
    error,
    isError: !!error,
    refetch: fetchData
  };
}

module.exports = { useReverseLookup }; 