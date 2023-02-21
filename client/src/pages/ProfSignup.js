import { useState } from "react"
import { useProfSignup } from "../hooks/useProfSignup"
// import { useStudentSignup } from "../hooks/useStudentSignup"

// email, password, name, dept, chamber, researchInterest, websites, hod

const ProfSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [dept, setDept] = useState('')
    const [chamber, setChamber] = useState('')
    const [researchInterest, setRI] = useState('') 
    const [websites, setWebsites] = useState('')
    const [hod, setHOD] = useState('')
    const {signup, error, isLoading} = useProfSignup()

    const handleSubmit = async (e) => {
        e.preventDefault() // prevents default refresh of page
        // console.log(email, password, name, dept, chamber, researchInterest, websites, hod);

        await signup(email, password, name, dept, chamber, researchInterest, websites, hod)

    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>SignUp</h3>
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
            <label>Name</label>
            <input 
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Department</label>
            <input 
                onChange={(e) => setDept(e.target.value)}
                value={dept}
            />

            <label>Chamber</label>
            <input 
                onChange={(e) => setChamber(e.target.value)}
                value={chamber}
            />
            
            <label>Research Interests</label>
            <input 
                onChange={(e) => setRI(e.target.value)}
                value={researchInterest}
            />
            
            <label>Websites (links for LinkedIn, etc)</label>
            <input 
                onChange={(e) => setWebsites(e.target.value)}
                value={websites}
            />

            {/* <label>HOD</label>
            <input 
                type="bool"
                onChange={(e) => setHOD(e.target.value)}
                value={setHOD}
            /> */}

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default ProfSignup