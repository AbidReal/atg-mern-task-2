import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SingUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Components/SingUp/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
