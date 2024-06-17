import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type AuthStore = {
  tabList: string[];
  addTab: (url: string) => void;
};

type MyPersist = (config: StateCreator<AuthStore>, options: PersistOptions<AuthStore>) => StateCreator<AuthStore>;

const useTabListStore = create<AuthStore, []>(
  (persist as MyPersist)(
    (set, get): AuthStore => ({
      tabList: [],
      addTab: (url: string) =>
        set((state) => {
          if (!state.tabList.includes(url)) {
            return { tabList: [...state.tabList, url] };
          } else {
            return { tabList: state.tabList };
          }
        }),
    }),
    {
      name: 'tab-list',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTabListStore;
