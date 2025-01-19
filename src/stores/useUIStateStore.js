import { create } from "zustand";

export const useUIStateStore = create((set) => ({
  hasRulesMessageBeenDismissed: false,
  inGame: false,
  gameOver: false,
  rankings: new Map(),

  setHasRulesMessageBeenDismissed: (bool) =>
    set({
      hasRulesMessageBeenDismissed: bool,
    }),

  setInGame: (bool) => set({ inGame: bool }),

  setGameOver: (bool) => set({ gameOver: bool }),

  updateRankings: (imgObject) => {
    set((state) => {
      const newRankings = new Map(state.rankings); // Create a copy of the current rankings

      if (!newRankings.has(imgObject.img_name)) {
        newRankings.set(imgObject.img_name, 1);
      } else {
        newRankings.set(
          imgObject.img_name,
          newRankings.get(imgObject.img_name) + 1
        );
      }

      console.log(newRankings);

      return { rankings: newRankings }; // Update the rankings in the store
    });
  },
}));
