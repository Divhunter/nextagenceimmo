import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true) // État de chargement
  const [user, setUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded = jwtDecode(token)
        setIsAuthenticated(true)
        setIsLoading(false) // Marquer le chargement comme terminé
        // console.log('user:', decoded)
        setUser(decoded)
        // Vérifier si le token n'est pas expiré
        const currentTime = Date.now() / 1000; // Convertir en secondes
        if (decoded.exp < currentTime) {
          // Le token est expiré et on déconnecte l'utilisateur 
          logout()
        }
      } catch (error) {
        setIsLoading(false) // Marquer le chargement comme terminé en cas d'erreur
      }
    } else {
      setIsLoading(false) // Marquer le chargement comme terminé si aucun token n'est présent
    }
  }, [isAuthenticated])

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{user, isAuthenticated, setIsAuthenticated, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
