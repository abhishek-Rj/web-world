import { Routes, Route } from "react-router-dom";
import World from "@/pages/World";
import Join from "@/pages/Join";

export default function App() {
  return (
    <Routes>
      <Route path="/world/:worldId" element={<World />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}
