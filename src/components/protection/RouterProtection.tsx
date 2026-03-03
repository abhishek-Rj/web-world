import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RouterProtection() { 
  const { accessToken, loading } = useAuth()
  if (loading) {
    return <div>Loading...</div>
  }
  if (!accessToken) {
    return <Navigate to="/login" replace/>
  }
  return <Outlet />
}