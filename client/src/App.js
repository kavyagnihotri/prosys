import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages and components
import ProjectForm from "./components/project/NewProjectForm"
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
import ProfUpdate from "./components/project/ProfUpdateProfile"
import StudentUpdate from "./components/project/StudentUpdateProfile"
function App() {
    const { user } = useAuthContext()

    var studentregex = new RegExp("[fhp][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].*")
    var profregex = new RegExp("[a-zA-Z]*@.*com")
    var role = 0

    // localstorage fetch
    // const data = window.localStorage
    //

    if (user != null) {
        if (user.email === "augsd@gmail.com") {
            role = 1
        } else if (studentregex.test(user.email)) {
            role = 2
        } else if (profregex.test(user.email)) {
            role = 3
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route
                            path="/augsd/login"
                            element={!user ? <AugsdLogin /> : <Navigate to="/augsd/dashboard" />}
                        />

                        <Route
                            path="/augsd/dashboard"
                            element={
                                user && user.email === "augsd@gmail.com" ? (
                                    <AugsdDashboard />
                                ) : (
                                    <Navigate to="/augsd/login" />
                                )
                            }
                        />

                        <Route
                            path="/augsd/hod"
                            element={
                                user && user.email === "augsd@gmail.com" ? <AugsdHod /> : <Navigate to="/augsd/login" />
                            }
                        />

                        <Route
                            path="/student/login"
                            element={!user ? <StudentLogin /> : <Navigate to="/student/dashboard" />}
                        />

                        <Route
                            path="/student/dashboard"
                            element={user ? <StudentDashboard /> : <Navigate to="/student/login" />}
                        />

                        <Route
                            path="/student/profile/update"
                            element={<StudentUpdate />}
                        />

                        <Route
                            path="/student/signup"
                            element={!user ? <StudentSignup /> : <Navigate to="/student/dashboard" />}
                        />

                        <Route path="/student/createApplication/:id" element={<ApplicationForm />} />

                        <Route path="prof/login" element={!user ? <ProfLogin /> : <Navigate to="/prof/dashboard" />} />

                        <Route
                            path="prof/signup"
                            element={!user ? <ProfSignup /> : <Navigate to="/prof/dashboard" />}
                        />

                        <Route
                            path="/prof/dashboard"
                            element={user ? <ProfDashboard /> : <Navigate to="/prof/login" />}
                        />
                        <Route path="/prof/project/add" element={<ProjectForm />} />
                        <Route
                            path="/prof/profile/update"
                            element= {<ProfUpdate />}
                        />
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
