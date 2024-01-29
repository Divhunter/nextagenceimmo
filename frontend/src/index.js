import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Notifications } from 'react-push-notification';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styles
import './styles/index.css'
import './styles/Normalize.css'

import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjetContext';

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        {/* <Notifications /> */}
        <ToastContainer />
        <AuthProvider>
            <ProjectProvider>
                <Router>
                    <App />
                </Router>
            </ProjectProvider>
        </AuthProvider>
    </React.StrictMode>
)