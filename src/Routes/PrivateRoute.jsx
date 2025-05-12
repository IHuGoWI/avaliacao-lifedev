import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {

    const { user } = useAuthValue()

    if (!user) {

        return <Navigate to="/login" />

    }

  return children
}

export default PrivateRoute