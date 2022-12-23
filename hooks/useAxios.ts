import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  DependencyList,
} from 'react';

// * axios
import axios from 'axios';

interface Options<T> {
  setState: Dispatch<SetStateAction<T>>;
  dependencies?: DependencyList;
  ssr?: boolean;
  revalidation?: { revalidate: boolean; interval?: number };
}

const useAxios = <T>() => ({
  get: (url: string, options: Options<T>) => {
    const { setState, dependencies = [], ssr = false } = options;
    const { revalidation = { revalidate: false } } = options;
    const { revalidate, interval = 30 * 1000 } = revalidation;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
      if (url.includes('undefined')) return;

      if (!ssr) setLoading(true);

      const fetcher = async () => {
        try {
          const { data } = await axios.get(url.trim());
          setState(data);
          setLoading(false);
          setError(null);
        } catch (err: unknown) {
          setError(err);
        }
      };

      fetcher();

      let revalidator: NodeJS.Timer;
      if (revalidate) revalidator = setInterval(fetcher, interval);

      return () => clearInterval(revalidator);
    }, dependencies);

    return { loading, error };
  },
});
export default useAxios;
