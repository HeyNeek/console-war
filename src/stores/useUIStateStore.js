import { create } from "zustand";

export const useUIStateStore = create((set) => ({
  hasRulesMessageBeenDismissed: false,
  disableNavBar: false,
  gameOver: false,
  favoriteConsole: "",
  rankings: new Map(),

  setHasRulesMessageBeenDismissed: (bool) =>
    set({
      hasRulesMessageBeenDismissed: bool,
    }),

  setDisableNavBar: (bool) => set({ disableNavBar: bool }),

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

  clearRankings: () => set({ rankings: new Map() }),

  setFavoriteConsole: (console) => set({ favoriteConsole: console }),

  clearFavoriteConsole: () => set({ favoriteConsole: "" }),
}));
