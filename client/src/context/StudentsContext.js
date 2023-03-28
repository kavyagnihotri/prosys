import { createContext, useReducer } from "react";

export const StudentsContext = createContext()

export const studentReducer = (state, action) => {
    // state -> previous state value
    // action -> what we want to do with the workout
    switch(action.type) {
        case 'SET_STUDENTS':
            return {
                students: action.payload
            }
        case 'CREATE_STUDENT':
            return {
                // adding the new application to the start of old list 
                // ...state.applications makes it iteratable, we don't want that
                students: [action.payload, state.applications]
            }
        default:
            return state
    }
}

export const StudentsContextProvider = ({ children }) => {
    const [state, dispatch1] = useReducer(studentReducer, {
        students: null
    })

    return (
        <StudentsContext.Provider value={{...state, dispatch1}}>
            { children }
        </StudentsContext.Provider>
    )
}