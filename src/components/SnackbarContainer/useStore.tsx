'use client';
import { Dispatch, SetStateAction, useState } from 'react';

const useStore = (): [ISnackBar[], (value: ISnackBar[]) => void] => {
  const [state, set] = useState(store.state);

  store.setter = set;

  return [state, store.setState];
};

export { useStore };

export interface ISnackBar {
  _rand: number;
  _text: string;
  _subText?: string;
  _confirmText?: string;
  _reFuseText?: string;
  _handleClickConfirm?(): void;
  _handleClickReFuse?(): void;
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
  state: ISnackBar[];
  setState(value: ISnackBar[]): void;
  setter: Dispatch<SetStateAction<ISnackBar[]>>;
}
