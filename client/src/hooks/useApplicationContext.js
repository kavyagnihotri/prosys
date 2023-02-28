import { ApplicationsContext } from "../context/ApplicationContext";
import { useContext } from "react";

export const useApplicationContext = () => {
    const context = useContext(ApplicationsContext)

    if(!context) {
        throw Error('useApplicationContext must be used inside an ApplicationContextProvider')
    }

    return context
}