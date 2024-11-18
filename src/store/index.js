import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { config } from "@/config";

const useStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ ...state, user })),
    currencyList: [],
    setCurrencyList: (currencyList) =>
      set((state) => ({ ...state, currencyList })),
  }))
);

const useSettingsStore = create(
  persist(
    devtools((set) => ({
      token: null,
      darkMode: false,
      lang: config.DEFAULT_APP_LANG,
      setToken: (token) => set((state) => ({ ...state, token })),
      setLang: (lang) => set((state) => ({ ...state, lang })),
      setMode: () => set((state) => ({ ...state, darkMode: !state.darkMode })),
    })),
    { name: "settings" }
  )
);

const useBasketStore = create(
  persist(
    (set) => ({
      basket: [],
      setBasket: (basket) => set((state) => ({ ...state, basket })),
    }),
    { name: "basket" }
  )
);

export { useStore, useSettingsStore, useBasketStore };
