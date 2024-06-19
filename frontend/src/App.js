import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
