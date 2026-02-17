import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/me");
        setData(res.data);
      } catch {
        logout();
      }
    };
    load();
  }, [logout]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                Secure Area
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                You are successfully authenticated and viewing protected data.
              </p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Session Status</p>
            <p className="mt-2 text-xl font-bold text-emerald-600">Active</p>
            <p className="mt-1 text-sm text-slate-600">JWT token is available.</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Environment</p>
            <p className="mt-2 text-xl font-bold text-slate-900">Development</p>
            <p className="mt-1 text-sm text-slate-600">Connected to local API.</p>
          </article>
        </div>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-slate-700">Profile Payload</h2>
          </div>
          <div className="p-5">
            {!data ? (
              <div className="flex items-center gap-3 text-slate-600">
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-sky-500" />
                Loading profile...
              </div>
            ) : (
              <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-6 text-slate-100">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
