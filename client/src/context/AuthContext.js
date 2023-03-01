import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // action payload is the user we get back from the server
            return { user: action.payload }
        case 'LOGOUT': 
            return { user: null }
        default:
            // changed here so that student can go to applicationForm 
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        // const student = JSON.parse(localStorage.getItem('student'))
        
        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }

        // if(student) {
        //     dispatch({type: 'LOGIN', payload: student})
        // }

    }, [])

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}