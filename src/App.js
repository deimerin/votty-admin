import React from "react";
import SignInSide from "./pages/SignIn";
import Dashboard from "./pages/main";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// #3734a8
// var buf = crypto.randomBytes(16).toString('Base64');
// var Crypto = require('crypto')

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
