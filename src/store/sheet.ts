import { createWithEqualityFn } from 'zustand/traditional';

type State = {
  open: boolean;
};

type Action = {
  updateOpen: (open: State['open']) => void;
};

// Create your store, which includes both state and (optionally) actions
const useSheetStore = createWithEqualityFn<State & Action>((set) => ({
  open: false,
  updateOpen: (open) => set(() => ({ open })),
}));

export { useSheetStore };
