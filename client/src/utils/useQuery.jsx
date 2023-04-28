import { useMutation, useQuery } from "react-query";
import axios from "axios";

const host = import.meta.env.VITE_SERVER_HOST;

export const useQueryGet = (link, key, queryOptions = {}) => {
  const queryFunc = async () => {
    const response = await axios.get(host + link);
    return response.data;
  };

  return useQuery([key, host + link], queryFunc, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    ...queryOptions,
  });
};

export const useQueryFetch = (link, method) => {
  const mutation = useMutation(async (req) => {
    const response = await axios[method](host + link, req?.body);
    return response.data;
  });

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    mutate: mutation.mutate,
  };
};