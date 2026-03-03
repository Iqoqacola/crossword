import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreate from "./pages/AdminCreate";

function App() {
  return (
    <Router>
      <Routes>
        {/* Player */}
        <Route path="/" element={<Home />} />
        <Route path="/play/:id" element={<Player />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<AdminCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
