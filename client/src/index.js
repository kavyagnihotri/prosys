import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectContext';
import { ApplicationsContextProvider } from './context/ApplicationsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ApplicationsContextProvider>
                <ProjectsContextProvider>
                    <App />
                </ProjectsContextProvider>
            </ApplicationsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

