import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignInPage, SignupPage, Home } from "./Components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./Utils/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        limit={10}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
