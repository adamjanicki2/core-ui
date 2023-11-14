import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeProvider = () => {
  const theme = useTheme();
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  return null;
};

export default ThemeProvider;
