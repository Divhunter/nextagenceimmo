import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminContainer from '../pages/AdminContainer'
import Login from '../admin/Login'
import Card from '../admin/Card'
import Error from '../_utils/Error'
import ScrollToTop from '../functions/ScrollToTop'

// styles
import '../styles/m-app.css'
import '../styles/t-d-app.css'
import ProtectedRoute from '../routes/ProtectedRoute'

const AdminRouter = () => {

    return (
        <div>
            <Routes>
                <Route index element={<Login />} />
                <Route path='dashboard/*' element={<Login />} />
                <Route
                    path="costumers/*"
                    element={
                        <ProtectedRoute >
                            <AdminContainer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="card/:id/*"
                    element={
                        <ProtectedRoute >
                            <Card />
                        </ProtectedRoute>
                    }
                />
                <Route path='*' element={<Error />} />
            </Routes>

            <ScrollToTop />
        </div>
    )
}

export default AdminRouter