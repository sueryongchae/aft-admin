import { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    if (KeyList.includes(key)) localStorage.setItem(key, JSON.stringify(state));
    else {
      alert('없는 키값 입니다');
    }
  }, [key, state]);

  useEffect(() => {
    console.log('zsd');
    setState(JSON.parse(localStorage.getItem(key)!));
  }, []);

  return [state, setState] as const;
}

export default useLocalStorage;

const KeyList = ['TabList'];
