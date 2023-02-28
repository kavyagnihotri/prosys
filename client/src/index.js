import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectContext';
import { ApplicationsContextProvider } from './context/ApplicationContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ProjectsContextProvider>
                <ApplicationsContextProvider>
                    <App />
                </ApplicationsContextProvider>
            </ProjectsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

