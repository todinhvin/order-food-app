import { useCallback, useState } from "react";

const useHttp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = useCallback(async (requestConfig, transformData) => {
    try {
      setIsLoading(true);
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      transformData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
