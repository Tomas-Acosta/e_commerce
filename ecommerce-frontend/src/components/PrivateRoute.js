import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importamos el contexto de autenticación

// Componente de ruta protegida
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext); // Usamos el contexto de autenticación

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
