import { createWithEqualityFn } from 'zustand/traditional';

type State = {
  model: string;
};

type Action = {
  updateModel: (model: State['model']) => void;
};

const useModelStore = createWithEqualityFn<State & Action>((set) => ({
  model: 'gpt-3.5-turbo',
  updateModel: (model) => set(() => ({ model })),
}));

export { useModelStore };
