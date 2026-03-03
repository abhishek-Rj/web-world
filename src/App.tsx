import { Routes, Route } from "react-router-dom";
import World from "@/pages/World";
import Join from "@/pages/Join";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Character from "@/pages/Character";
import RouterProtection from "@/components/protection/RouterProtection";

export default function App() {
  return (
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route element={<RouterProtection />}>
          <Route path="/join" element={<Join />} />
          <Route path="/world/:worldId" element={<World />} />
          <Route path="/character" element={<Character />} />
        </Route>
      </Routes>
  );
}
