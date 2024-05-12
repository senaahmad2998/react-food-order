import { useCallback, useEffect, useState } from "react";

export async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const data = response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "There is something wrong when fetching data."
    );
  }

  return data;
}

export default function useFetch(url, config, initialValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);

  function clearData() {
    setData(initialValue);
  }

  const sendRequest = useCallback(
    async function sendRequest(dataBody) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: dataBody,
        });
        setData(resData);
        setError();
      } catch (err) {
        console.log(err.message);
        setError(err.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest]);

  console.log(data);

  return { isLoading, error, data, sendRequest, clearData };
}
