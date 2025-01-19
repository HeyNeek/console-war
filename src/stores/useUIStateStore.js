import { create } from "zustand";

export const useUIStateStore = create((set) => ({
  hasRulesMessageBeenDismissed: false,

  setHasRulesMessageBeenDismissed: (bool) =>
    set({
      hasRulesMessageBeenDismissed: bool,
    }),
}));
