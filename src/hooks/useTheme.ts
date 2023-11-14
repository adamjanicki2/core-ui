import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useMediaQuery from "./useMediaQuery";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

export type ThemePreferenceStore = {
  /**
   * The current theme preference.
   */
  preference: ThemePreference;
  /**
   * Set the theme preference.
   *
   * @param preference the new theme preference
   */
  setPreference: (preference: ThemePreference) => void;
};

/**
 * A hook for getting and setting the current theme preference.
 */
export const useThemePreference = create(
  persist<ThemePreferenceStore>(
    (set) => ({
      preference: "system",
      setPreference: (preference: ThemePreference) => set({ preference }),
    }),
    {
      name: "theme-preference-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * A hook for getting the current theme
 *
 * @returns The current theme, either "light" or "dark"
 */
export const useTheme = (): Theme => {
  const prefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const { preference } = useThemePreference();
  return preference === "system"
    ? prefersDark
      ? "dark"
      : "light"
    : preference;
};
