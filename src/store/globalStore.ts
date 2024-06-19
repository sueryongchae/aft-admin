import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type GlobalStore = {
  minimize: boolean;
  toggleMinimize: () => void;
};

type MyPersist = (config: StateCreator<GlobalStore>, options: PersistOptions<GlobalStore>) => StateCreator<GlobalStore>;

const globalStore = create<GlobalStore, []>(
  (persist as MyPersist)(
    (set, get): GlobalStore => ({
      minimize: false,
      toggleMinimize: () =>
        set((state) => {
          return { minimize: !state.minimize };
        }),
    }),
    {
      name: 'global',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default globalStore;
