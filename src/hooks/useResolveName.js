const { useState, useEffect, useCallback } = require("react");
const { resolveName } = require("../api");

function useResolveName(name, options = {}) {
  const {
    rpc,
    enabled = true,
    refetchInterval = 1000 * 30,
  } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!name || !enabled) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await resolveName(name, rpc);
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [name, rpc, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || !name || !refetchInterval) {
      return;
    }

    const interval = setInterval(() => {
      fetchData();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [fetchData, enabled, name, refetchInterval]);

  return {
    value: data,
    isLoading,
    error,
    isError: !!error,
    refetch: fetchData
  };
}

module.exports = { useResolveName }; 