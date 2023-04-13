import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { serverURL } from "../utils/constants"

export const useStudentSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi, notify) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(serverURL + "/student/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi, notify }),
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // save the student to local storge
            localStorage.setItem("user", JSON.stringify(json))

            // update the auth context
            dispatch({ type: "LOGIN", payload: json })

            setIsLoading(false)
        }
    }
    return { signup, error, isLoading }
}
// email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi
