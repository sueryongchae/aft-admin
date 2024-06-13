'use client';
import { Dispatch, SetStateAction, useState } from 'react';

const useStore = (): [IToast[], (value: IToast[]) => void] => {
  const [state, set] = useState(store.state);

  store.setter = set;

  return [state, store.setState];
};

export { useStore };

export interface IToast {
  _rand: number;
  _type: 'error' | 'info' | 'complete' | 'warning';
  _title: string;
  _subTitle?: string;
  _isCancel?: boolean;
}

export const store: IStore = {
  state: [],
  setState(value) {
    store.state = value;
    store.setter(store.state);
  },
  setter: () => {},
};

interface IStore {
  state: IToast[];
  setState(value: IToast[]): void;
  setter: Dispatch<SetStateAction<IToast[]>>;
}
