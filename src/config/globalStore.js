import { createContext, useContext } from "react"

export const StateContext = createContext();
export const useGlobalState = () => useContext(StateContext);