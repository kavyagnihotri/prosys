import { createContext, useReducer } from 'react';

export const ProfContext = createContext()

export const profReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROF':
            return {
                projects: action.payload
            }
        default:
            return state
    }
}

export const ProfContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profReducer, {
        projects: null,
        approvedprojects: null
    })

    return (
        <ProfContext.Provider value={{...state, dispatch}}>
            { children }
        </ProfContext.Provider>
    )
}