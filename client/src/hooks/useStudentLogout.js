import { useAuthContext } from "./useAuthContext"

export const useStudentLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove student from storage
        localStorage.removeItem('student')

        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}