import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';

function App() {
  const { student } = useAuthContext()

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
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
