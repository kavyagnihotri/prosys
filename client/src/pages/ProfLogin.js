import { useState } from "react"
// import { useStudentSignup } from "../hooks/useStudentSignup"

// email, password, name, dept, chamber, researchInterest, websites, hod

const ProfLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const {signup, error, isLoading} = useStudentSignup()

    const handleSubmit = async (e) => {
        e.preventDefault() // prevents default refresh of page
        console.log(email, password);

        // await signup(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi)

    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button>Login</button>
            {/* {error && <div className="error">{error}</div>} */}

        </form>
    )
}

export default ProfLogin