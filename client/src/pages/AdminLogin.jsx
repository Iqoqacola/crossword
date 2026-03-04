import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useEffect } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/admin/signin", { username, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Gagal login. Periksa username dan password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md mb-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800">
            Admin Login
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Masukkan password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3 px-4 rounded-xl text-white transition-all shadow-md ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isLoading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </div>
      <Link
        to="/"
        className="mb-8 text-slate-500 hover:text-blue-600 font-medium transition-colors"
      >
        &larr; Kembali ke Beranda
      </Link>
    </div>
  );
};

export default AdminLogin;
