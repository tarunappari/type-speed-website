import { createContext, useContext, useState } from "react";

export const TimeModeContext = createContext();


export const TimeModeContextProvider = ({children}) =>{

    let [testTime,setTestTime] = useState(15)

    let values = {
        testTime,
        setTestTime,
    }

    return(
        <TimeModeContext.Provider value={values}>
            {children}
        </TimeModeContext.Provider>
    )
}

export const useTimeModeContext = () => useContext(TimeModeContext);