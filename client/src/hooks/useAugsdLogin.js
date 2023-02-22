import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import * as React from 'react';

export const useAugsdLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        console.log({email,password})
        const response = await fetch('/augsd/login', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            
            localStorage.setItem('user', JSON.stringify(response))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            window.location.href = "./augsd/dashboard";
        }
    }
    return { login, error, isLoading }
}