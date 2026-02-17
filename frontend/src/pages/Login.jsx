import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../api/client";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email";
    if (!form.password.trim()) return "Password is required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) return setError(msg);

    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let isMounted = true;

    const verifyToken = async () => {
      try {
        await api.get("/api/me");
        if (isMounted) navigate("/dashboard");
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),transparent_45%),radial-gradient(circle_at_80%_90%,_rgba(168,85,247,0.22),transparent_35%)]" />

      <section className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex min-h-[520px] items-center p-6 sm:min-h-[560px] sm:p-10">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-sky-700/30">
                Z
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-sky-300">
                  Zephyra
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  Secure Portal
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white">Sign In</h2>
            <p className="mt-2 text-sm text-slate-300">
              Enter your credentials to continue.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@test.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Admin@123"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)]"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:from-sky-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

          </div>
        </div>
      </section>
    </main>
  );
}
