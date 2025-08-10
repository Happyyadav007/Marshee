import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar";
import Community from "./pages/Community/Community";
import Store from "./pages/Store/Store";
import Petcare from "./pages/Petcare/Petcare";
import Mypets from "./pages/Mypets/Mypets";
import Navbar from "./components/layout/Navbar";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

function AppLayout() {
  const location = useLocation();

  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
     <div className="flex flex-col lg:flex-row app">
      {!hideLayout && <Sidebar />}
      <div className={!hideLayout ? "flex-1 lg:ml-40" : "flex-1"}>
        {!hideLayout && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/store" element={<Store />} />
          <Route path="/petcare" element={<Petcare />} />
          <Route path="/mypets" element={<Mypets />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
