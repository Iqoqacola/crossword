import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [crosswords, setCrosswords] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchCrosswords();
  }, [navigate]);

  const fetchCrosswords = async () => {
    try {
      const response = await api.get("/puzzles");
      if (response.data.success) {
        setCrosswords(response.data.data || []);
      }
    } catch (err) {
      console.error("Gagal mengambil data crossword", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-extrabold text-slate-800">
          Admin <span className="text-blue-600">Creator</span>
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Daftar Puzzle TTS
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Kelola teka-teki silang yang tersedia untuk pemain.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/create")}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all flex items-center gap-2"
            >
              <span>+</span> Buat Puzzle Baru
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-5 text-sm font-bold text-slate-600">
                      Judul Puzzle
                    </th>
                    <th className="p-5 text-sm font-bold text-slate-600">
                      Jumlah Kata
                    </th>
                    <th className="p-5 text-sm font-bold text-slate-600">
                      Dibuat Pada
                    </th>
                    <th className="p-5 text-sm font-bold text-slate-600 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {crosswords.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-10 text-center text-slate-500 bg-slate-50/50 border-dashed border-2 border-slate-200 m-4 rounded-xl"
                      >
                        Belum ada puzzle yang dibuat. Ayo buat satu!
                      </td>
                    </tr>
                  ) : (
                    crosswords.map((cw) => (
                      <tr
                        key={cw.id}
                        className="hover:bg-blue-50/50 transition-colors group"
                      >
                        <td className="p-5 font-bold text-slate-800">
                          {cw.title}
                        </td>
                        <td className="p-5 text-slate-600">
                          <span className="bg-slate-100 text-slate-700 py-1 px-3 rounded-full text-xs font-bold">
                            {cw.words_data?.length || 0} Kata
                          </span>
                        </td>
                        <td className="p-5 text-slate-500 text-sm">
                          {new Date(cw.createdAt).toLocaleDateString("id-ID")}
                        </td>
                        <td className="p-5 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/play/${cw.id}`)}
                            className="text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
