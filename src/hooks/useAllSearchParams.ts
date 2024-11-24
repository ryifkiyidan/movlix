import { useSearchParams } from 'next/navigation';

const useAllSearchParams = () => {
  const searchParams = useSearchParams();

  if (!searchParams) {
    return {};
  }

  // Convert the searchParams iterable to an object
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

export default useAllSearchParams;
