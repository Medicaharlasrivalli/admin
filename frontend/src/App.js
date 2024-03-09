import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import View from "./components/View";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import Welcome from "./components/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
        <Route path='/edit/:id'element={<Edit/>}></Route>
        <Route path='/delete/:id' element={<Delete/>}></Route>
        <Route path='/adminHome' element={<AdminHome/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
