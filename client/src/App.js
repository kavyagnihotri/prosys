import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages and components
import ProjectForm from "./components/project/ProjectForm"
import StudentLogin from "./pages/student/StudentLogin"
import StudentSignup from "./pages/student/StudentSignup"
import AugsdLogin from "./pages/augsd/AugsdLogin"
import AugsdDashboard from "./pages/augsd/AugsdDashboard"
import ProfLogin from "./pages/professor/ProfLogin"
import ProfSignup from "./pages/professor/ProfSignup"
import HomePage from "./components/muiButton"
import StudentDashboard from "./pages/student/StudentDashboard"
import ProfDashboard from "./pages/professor/ProfDashboard"
import ApplicationForm from "./components/application/ApplicationForm"
import AugsdHod from "./pages/augsd/AugsdHod"
import ChatPage from "./components/chatDirectory/chatPage"
import ViewApplications from "./components/application/ViewApplications"

function App() {
    const { user } = useAuthContext()

    // localstorage fetch
    // const data = window.localStorage
    //

    if (user != null) {
        console.log("ROLE " + user.role)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route
                            path="/augsd/login"
                            element={!user || user.role !== "0" ? <AugsdLogin /> : <Navigate to="/augsd/dashboard" />}
                        />

                        <Route
                            path="/augsd/dashboard"
                            element={user && user.role === "0" ? <AugsdDashboard /> : <Navigate to="/augsd/login" />}
                        />

                        <Route
                            path="/augsd/hod"
                            element={
                                user && user.email === "augsd@gmail.com" ? <AugsdHod /> : <Navigate to="/augsd/login" />
                            }
                        />

                        <Route
                            path="/student/login"
                            element={
                                !user || user.role !== "2" ? <StudentLogin /> : <Navigate to="/student/dashboard" />
                            }
                        />

                        <Route
                            path="/student/dashboard"
                            element={
                                user && user.role === "2" ? <StudentDashboard /> : <Navigate to="/student/login" />
                            }
                        />

                        <Route
                            path="/student/signup"
                            element={!user ? <StudentSignup /> : <Navigate to="/student/dashboard" />}
                        />

                        <Route path="/student/createApplication/:id" element={<ApplicationForm />} />

                        <Route
                            path="prof/login"
                            element={!user || user.role !== "1" ? <ProfLogin /> : <Navigate to="/prof/dashboard" />}
                        />

                        <Route
                            path="prof/signup"
                            element={!user ? <ProfSignup /> : <Navigate to="/prof/dashboard" />}
                        />

                        <Route
                            path="/prof/dashboard"
                            element={user && user.role === "1" ? <ProfDashboard /> : <Navigate to="/prof/login" />}
                        />
                        <Route path="/prof/project/add" element={<ProjectForm />} />
                        <Route path="/chatPage" element={<ChatPage></ChatPage>} />

                        <Route
                            path="/prof/project/view/:id"
                            element={user ? <ViewApplications /> : <Navigate to="/prof/login" />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
