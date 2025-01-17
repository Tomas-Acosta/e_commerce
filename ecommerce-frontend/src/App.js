import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext'; // Importamos el AuthProvider
import CartPage from './pages/CartPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* Ruta protegida 
          <PrivateRoute path="/profile" element={<ProfilePage />} />*/}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
