import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPuzzles();
  }, []);

  const fetchPuzzles = async () => {
    try {
      const response = await api.get("/puzzles");
      if (response.data.success) {
        setPuzzles(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 401) navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Koleksi Puzzle
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              {puzzles.length} teka-teki yang sudah dibuat.
            </p>
          </div>
          <Link to="/admin/create">
            <button className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Tambah Puzzle
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white rounded-3xl animate-pulse border border-slate-100"
              ></div>
            ))
          ) : puzzles.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">
                Belum ada data. Klik tombol Tambah Puzzle.
              </p>
            </div>
          ) : (
            puzzles.map((puzzle) => (
              <div
                key={puzzle.id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    #
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
                    ID: {puzzle.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                  {puzzle.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {new Date(puzzle.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                    {puzzle.words_data?.length || 0} Kata
                  </span>
                  <button
                    className="text-slate-300 hover:text-indigo-600 transition-colors"
                    onClick={() => navigate(`/play/${puzzle.id}`)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
