import { ProfContext } from "../context/ProfContext"
import { useContext } from "react"

export const useProfContext = () => {
    const context = useContext(ProfContext)

    if(!context) {
        throw Error('useProfContext must be used inside an ProfContextProvider')
    }

    return context
}
