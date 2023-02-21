import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // action payload is the student we get back from the server
            return { student: action.payload }
        case 'LOGOUT': 
            return { student: null }
        default:
            return false
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        student: null
    })

    useEffect(() => {
        const student = JSON.parse(localStorage.getItem('student'))
        
        if(student) {
            dispatch({type: 'LOGIN', payload: student})
        }

    }, [])

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}