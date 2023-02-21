import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// import TEST from './pages/test'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import ProfLogin from './pages/ProfLogin';
import ProfSignup from './pages/ProfSignup';

function App() {
  const { student } = useAuthContext() //

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
            path="/"
            element={student ? <Home /> : <Navigate to='/student/login' />}
            />

            <Route
              path="/student/login"
              element={!student ? <StudentLogin /> : <Navigate to='/' />}
            />

            <Route
              path="/student/signup"
              element={!student ? <StudentSignup /> : <Navigate to='/' />}
            />

            <Route
              path="prof/login"
              element={<ProfLogin />}
            />

            <Route
              path="prof/signup"
              element={<ProfSignup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
