import { useState } from "react"
import { useStudentSignup } from "../hooks/useStudentSignup"

const StudentSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [studentID, setStudentID] = useState('')
    const [dept, setDept] = useState('')
    const [cgpa, setCgpa] = useState('')
    const [cv_link, setCv_link] = useState('') 
    const [per_link, setPer_link] = useState('')
    const [aoi, setAoi] = useState('')
    const {signup, error, isLoading} = useStudentSignup()

    const handleSubmit = async(e) => {
        e.preventDefault() // prevents default refresh of page

        await signup(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi)

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
            <label>Student ID</label>
            <input 
                onChange={(e) => setStudentID(e.target.value)}
                value={studentID}
            />

            <label>Department</label>
            <input 
                onChange={(e) => setDept(e.target.value)}
                value={dept}
            />
            
            <label>CGPA</label>
            <input 
                type="number"
                onChange={(e) => setCgpa(e.target.value)}
                value={cgpa}
            />
            
            <label>CV (provide link)</label>
            <input 
                onChange={(e) => setCv_link(e.target.value)}
                value={cv_link}
            />

            <label>Performance Sheet (provide link)</label>
            <input 
                onChange={(e) => setPer_link(e.target.value)}
                value={per_link}
            />

            <label>Area of Interest</label>
            <input 
                onChange={(e) => setAoi(e.target.value)}
                value={aoi}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default StudentSignup