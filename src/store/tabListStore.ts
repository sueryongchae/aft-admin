import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type TabListStore = {
  tabList: string[];
  addTab: (url: string) => void;
  deleteTab: (url: string) => void;
};

type MyPersist = (
  config: StateCreator<TabListStore>,
  options: PersistOptions<TabListStore>,
) => StateCreator<TabListStore>;

const useTabListStore = create<TabListStore, []>(
  (persist as MyPersist)(
    (set, get): TabListStore => ({
      tabList: [],
      addTab: (url: string) =>
        set((state) => {
          if (state.tabList.includes(url)) {
            return { tabList: state.tabList };
          } else {
            return { tabList: [...state.tabList, url] };
          }
        }),
      deleteTab: (url: string) =>
        set((state) => {
          return { tabList: [...state.tabList.filter((e) => e !== url)] };
        }),
    }),
    {
      name: 'tab-list',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTabListStore;
