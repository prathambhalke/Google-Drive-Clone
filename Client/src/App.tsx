import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignInPage, SignupPage, Home } from "./Components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={SignupPage} />
          <Route path="/signin" Component={SignInPage} />
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
