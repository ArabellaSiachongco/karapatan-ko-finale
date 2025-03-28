import { Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase"; // Import your Firebase auth

const ProtectedRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check authentication status using Firebase
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or show a loader while checking auth
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
