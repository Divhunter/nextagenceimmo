import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicContainer from '../pages/PublicContainer'
import Error from '../_utils/Error'

const PublicRouter = () => {

    return (
        <Routes>
            <Route element={<PublicContainer />}>
                <Route index element={<PublicContainer />} />
                <Route path='mutuact/*' element={<PublicContainer />} />
            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    )
}

export default PublicRouter