import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ProjectsContextProvider } from "./context/ProjectContext"
import { ApplicationsContextProvider } from "./context/ApplicationsContext"
import { AuthContextProvider } from "./context/AuthContext"
import { StudentsContextProvider } from "./context/StudentsContext"
import { ProfContextProvider } from "./context/ProfContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ProjectsContextProvider>
                <ApplicationsContextProvider>
                    <StudentsContextProvider>
                        <ProfContextProvider>
                            <App />
                        </ProfContextProvider>
                    </StudentsContextProvider>
                </ApplicationsContextProvider>
            </ProjectsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

