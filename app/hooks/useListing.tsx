import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useListing = (listingId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/individualListing/${listingId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useListing;
