import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/client";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState(() =>
    localStorage.getItem("token") ? "checking" : "invalid"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let isMounted = true;

    const verifyToken = async () => {
      try {
        await api.get("/api/me");
        if (isMounted) setStatus("valid");
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (isMounted) setStatus("invalid");
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
        Checking session...
      </div>
    );
  }

  if (status === "invalid") return <Navigate to="/login" replace />;

  return children;
}
