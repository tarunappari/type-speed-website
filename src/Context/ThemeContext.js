import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/ThemeOptions";

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) =>{

    let defaultTheme = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value;
    let [theme,setTheme] = useState(defaultTheme)

    let value ={
        theme,
        setTheme,
    }

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)