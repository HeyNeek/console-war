import { create } from "zustand";

export const useUIStateStore = create((set) => ({
  hasRulesMessageBeenDismissed: false,
  inGame: false,

  setHasRulesMessageBeenDismissed: (bool) =>
    set({
      hasRulesMessageBeenDismissed: bool,
    }),

  setInGame: (bool) => set({ inGame: bool }),
}));
