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
      {/* Navbar / Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-600">
            Crossword
          </h1>
          <Link
            to="/admin"
            className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            Admin Login &rarr;
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Pilih Puzzle</h2>
          <p className="text-slate-500 mt-2">
            Uji wawasanmu dengan menyelesaikan teka-teki silang di bawah ini.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        ) : puzzles.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 border-dashed">
            <p className="text-slate-500 text-lg">
              Belum ada puzzle yang tersedia saat ini.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {puzzles.map((puzzle) => (
              <div
                key={puzzle.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {puzzle.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <Link
                  to={`/play/${puzzle.id}`}
                  className="mt-6 w-full text-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
                >
                  Mainkan Sekarang
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
