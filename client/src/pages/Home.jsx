import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await api.get("/puzzles");
        if (response.data.success) {
          setPuzzles(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data puzzle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPuzzles();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Crossword
            </span>
          </Link>

          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            Admin Login
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 bg-white rounded-3xl animate-pulse border border-slate-100 shadow-sm"
              ></div>
            ))}
          </div>
        ) : puzzles.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-16 text-center border-2 border-slate-200 border-dashed max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Belum ada teka-teki
            </h3>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {puzzles.map((puzzle) => (
              <div
                key={puzzle.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                      ID: {puzzle.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                    {puzzle.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mt-3 flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(puzzle.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <Link
                  to={`/play/${puzzle.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 font-bold py-3.5 px-4 rounded-2xl transition-all duration-300"
                >
                  Mainkan Sekarang
                  <svg
                    className="w-5 h-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
