import { createContext, useReducer } from "react"

export const ProfContext = createContext()

export const profReducer = (state, action) => {
    switch (action.type) {
        case "SET_PROF":
            return {
                profs: action.payload,
            }
        default:
            return state
    }
}

export const ProfContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profReducer, {
        profs: null,
    })

    // dispatch({type: 'CREATE_PROJECTS', payload: [{}, {}]})

    return <ProfContext.Provider value={{ ...state, dispatch }}>{children}</ProfContext.Provider>
}
