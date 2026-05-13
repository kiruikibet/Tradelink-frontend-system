import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Profile from '../pages/user/Profile';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;