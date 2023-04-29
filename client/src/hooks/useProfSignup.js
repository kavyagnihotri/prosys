import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { serverURL } from "../utils/constants"

export const useProfSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, name, dept, chamber, researchInterest, websites, hod) => {
        setIsLoading(true)
        setError(null)
        var hod = false // by default

        const response = await fetch(serverURL + "/prof/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, dept, chamber, researchInterest, websites, hod }),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // save user to local storage, from auth context we get the email and the token
            localStorage.setItem("user", JSON.stringify(json))

            // update the authContext
            dispatch({ type: "LOGIN", payload: json })

            setIsLoading(false)
        }
    }
    return { signup, error, isLoading }
}
