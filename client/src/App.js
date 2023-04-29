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
import ChatPage from "./components/chatDirectory/chatPage"
import HoDApproval from "./components/application/HoDApproval"
import ViewApplications from "./components/application/ViewApplications"
import StudentProjectPage from "./components/project/StudentProjectPage"
import ProfProjectPage from "./components/project/ProfProjectPage"

function App() {
    const { user } = useAuthContext()

    const renderAugsdLogin = () => (!user || user.role !== "0" ? <AugsdLogin /> : <Navigate to="/augsd/dashboard" />)

    const renderAugsdDashboard = () => (user && user.role === "0" ? <AugsdDashboard /> : <Navigate to="/augsd/login" />)

    const renderStudentLogin = () =>
        !user || user.role !== "2" ? <StudentLogin /> : <Navigate to="/student/dashboard" />

    const renderStudentDashboard = () =>
        user && user.role === "2" ? <StudentDashboard /> : <Navigate to="/student/login" />

    const renderStudentSignup = () => (!user ? <StudentSignup /> : <Navigate to="/student/dashboard" />)

    const renderProfLogin = () => (!user || user.role !== "1" ? <ProfLogin /> : <Navigate to="/prof/dashboard" />)

    const renderProfDashboard = () => (user && user.role === "1" ? <ProfDashboard /> : <Navigate to="/prof/login" />)

    const renderViewApplications = () => (user ? <ViewApplications /> : <Navigate to="/prof/login" />)

    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route path="" />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/augsd/login" element={renderAugsdLogin} />
                        <Route path="/augsd/dashboard" element={renderAugsdDashboard} />
                        <Route path="/student/login" element={renderStudentLogin} />
                        <Route path="/student/dashboard" element={renderStudentDashboard} />
                        <Route path="/student/signup" element={renderStudentSignup} />
                        <Route path="/student/createApplication/:id" element={<ApplicationForm />} />
                        <Route path="/student/project/:id" element={<StudentProjectPage />} />
                        <Route path="/prof/project/:id" element={<ProfProjectPage />} />
                        <Route path="/prof/login" element={renderProfLogin} />
                        <Route
                            path="/prof/signup"
                            element={!user ? <ProfSignup /> : <Navigate to="/prof/dashboard" />}
                        />
                        <Route path="/prof/dashboard" element={renderProfDashboard} />
                        <Route path="/prof/project/add" element={<ProjectForm />} />
                        <Route path="/chatPage" element={<ChatPage />} />
                        <Route path="/prof/project/approve" element={<HoDApproval />} />
                        <Route path="/prof/project/view/:id" element={renderViewApplications} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
