import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../functions/loader/Loader';

const ProtectedRoute = ({ redirectPath = '/dashboard', children }) => {
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  // console.log('protect:', isAuthenticated,user)

  if (isLoading) {
    // Afficher un indicateur de chargement si le contexte est en cours de chargement
    return <Loader/>;
  }
  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers le dashboard
    return <Navigate to={redirectPath} replace />;
  }

  if (isAuthenticated && user.role !== 'admin') {
    // Si l'utilisateur est authentifié mais n'est pas un admin, redirigez-le également vers le dashboard
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
