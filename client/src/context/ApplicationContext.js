import { createContext, useReducer } from "react";

export const ApplicationsContext = createContext()

export const applicationReducer = (state, action) => {
    // state -> previous state value
    // action -> what we want to do with the workout
    switch(action.type) {
        case 'SET_APPLICATIONS':
            return {
                applications: action.payload
            }
        case 'CREATE_APPLICATION':
            return {
                // adding the new application to the start of old list 
                applications: [action.payload, ...state.applications]
            }
        case 'DELETE_APPLICATION':
            return state
        default:
            return state
    }
}

export const ApplicationsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(applicationReducer, {
        applications: null
    })

    return (
        <ApplicationsContext.Provider value={{...state, dispatch}}>
            { children }
        </ApplicationsContext.Provider>
    )
}