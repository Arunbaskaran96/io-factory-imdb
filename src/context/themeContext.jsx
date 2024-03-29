import { createContext, useContext, useEffect, useState } from "react";

export const themeContext = createContext();

export const themeState = () => {
  return useContext(themeContext);
};

export const ThemeProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const theme = toggle ? "dark" : "light";
  useEffect(() => {
    document.documentElement.setAttribute("data-type", theme);
  }, [toggle]);
  const themeAction = () => {
    setToggle((prev) => !prev);
  };
  return (
    <themeContext.Provider value={{ toggle, themeAction }}>
      {children}
    </themeContext.Provider>
  );
};
