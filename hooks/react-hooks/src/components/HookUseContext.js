import { createContext } from "react";

export const SomeContext = createContext()

export const HookUseContext = ({children}) => {
    const contextValue = "Testing context"
    const newContext = "lorem ipsum"

    return(
        <SomeContext.Provider value={{contextValue, newContext}}> {children} </SomeContext.Provider>
    )
}
