import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>ProSys</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    {!user && (
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