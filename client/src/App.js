import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// import TEST from './pages/test'

// pages and components
import Home from './pages/Home'
import Navbar from './components/StudentNavbar';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import AugsdLogin from './pages/AugsdLogin';
import AugsdDashboard from './pages/AugsdDashboard';
import ProfLogin from './pages/ProfLogin';
import ProfSignup from './pages/ProfSignup';
import HomePage from './components/muiButton';
import StudentDashboard from "./pages/StudentDashboard";
import ProfDashboard from './pages/ProfDashboard';
function App() {
  const { user } = useAuthContext() //
  console.log(user)
  var studentregex = new RegExp("[fFhHpP][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].*")
  


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <div className='pages'>
          <Routes>

            <Route 
            path="/"
            element={user ? <Home /> :  <HomePage /> }
            />

            <Route
            path="/augsd/login"
            element={!user ? <AugsdLogin /> : <Navigate to='/augsd/dashboard' />}
            />

            <Route
            path="/augsd/dashboard"
            element={user&&user.email==="augsd@gmail.com" ? <AugsdDashboard /> : <Navigate to='/augsd/login' />}
            />

            <Route
              path="/student/login"
              element={!user ? <StudentLogin /> : <Navigate to='/student/dashboard' />}
            />
            <Route
            path="/student/dashboard"
            element={user? <StudentDashboard /> : <Navigate to='/student/login' />}
            />

            <Route
              path="/student/signup"
              element={!user ? <StudentSignup /> : <Navigate to='/student/dashboard' />}
            />


            <Route
              path="prof/login"
              element={!user ? <ProfLogin /> : <Navigate to='/prof/dashboard' />}
            />

            <Route
              path="prof/signup"
              element={!user ? <ProfSignup /> : <Navigate to='/prof/dashboard' />}
            />
             <Route
            path="/prof/dashboard"
            element={user? <ProfDashboard /> : <Navigate to='/prof/login' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
