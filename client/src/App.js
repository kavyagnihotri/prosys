import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Home from './pages/Home'
import Navbar from './components/StudentNavbar';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import AugsdLogin from './pages/AugsdLogin';
import AugsdDashboard from './pages/AugsdDashboard';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className='pages'>
          <Routes>
            <Route 
            path="/"
            element={user ? <Home /> :  <Navigate to='/student/login' /> }
            />

            <Route
            path="/augsd/login"
            element={!user ? <AugsdLogin /> : <Navigate to='/' />}
            />

            <Route
            path="/augsd/dashboard"
            element={user ? <AugsdDashboard /> : <Navigate to='/augsd/login' />}
            />

            <Route
              path="/student/login"
              element={!user ? <StudentLogin /> : <Navigate to='/' />}
            />

            <Route
              path="/student/signup"
              element={!user ? <StudentSignup /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
