import { Link } from 'react-router-dom'
import { useStudentLogout } from '../hooks/useStudentLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useStudentLogout()
    const { student } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>ProSys - Student</h1>
                </Link>
                <nav>
                    {student && (
                    <div>
                        <span>{student.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    {!student && (
                    <div>
                        <Link to='/student/login'>Login</Link>
                        <Link to='/student/signup'>Signup</Link>
                    </div>
                    )}
                    <div>
                        <Link to='/prof/login'>Prof Login</Link>
                        <Link to='/prof/signup'>Prof Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar