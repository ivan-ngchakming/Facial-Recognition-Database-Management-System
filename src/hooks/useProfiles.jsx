import { useState, useEffect, useCallback } from 'react';
import { graphqlQuery } from '../graphql';
import { PROFILES as PROFILES_GQL_Q } from '../graphql/query';

export default function useProfiles(defaultPage, defaultPerPage) {
  const [profiles, setProfiles] = useState([]);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({
    page: defaultPage,
    perPage: defaultPerPage,
  });

  const refetch = useCallback((page, perPage) => {
    setOptions({ page, perPage });
  }, []);

  const fetch = useCallback(() => {
    console.log('Fetching photos', options);
    graphqlQuery(PROFILES_GQL_Q, options)
      .then((res) => {
        const data = res.profiles;
        setProfiles(data.profiles);
        setCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [options]);

  useEffect(() => {
    fetch(options);
  }, [options, fetch]);

  return [profiles, refetch, count];
}
