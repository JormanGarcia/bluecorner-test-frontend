import { useEffect, useState } from "react";

export const useApi = <t>(fun: () => Promise<t>) => {
  const [value, setValue] = useState<t | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApi = async () => {
    const response = await fun();
    setValue(response);
  };

  useEffect(() => {
    setLoading(true);
    fetchApi();
    console.log(loading);
  }, []);

  return {
    value,
    loading,
  };
};
