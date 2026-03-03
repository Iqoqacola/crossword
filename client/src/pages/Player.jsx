import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import api from "../services/api";
import CrosswordGrid from "../components/CrosswordGrid";

const Player = () => {
  const { id } = useParams();
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await api.get(`/puzzles/${id}`);
        if (response.data.success) {
          setPuzzle(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil puzzle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPuzzle();
  }, [id]);

  const processedWords = useMemo(() => {
    if (!puzzle) return [];

    const starts = [];
    puzzle.words_data.forEach((w) => {
      const key = `${w.row}-${w.col}`;
      if (!starts.find((s) => s.key === key)) {
        starts.push({ key, row: w.row, col: w.col });
      }
    });

    starts.sort((a, b) => (a.row === b.row ? a.col - b.col : a.row - b.row));

    const numberMap = {};
    starts.forEach((start, idx) => {
      numberMap[start.key] = idx + 1;
    });

    return puzzle.words_data.map((w) => ({
      ...w,
      number: numberMap[`${w.row}-${w.col}`],
    }));
  }, [puzzle]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  if (!puzzle)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Puzzle tidak ditemukan
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <header className="bg-white shadow-sm border-b border-slate-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2"
          >
            &larr; Home
          </Link>
          <h1 className="font-bold text-lg">{puzzle.title}</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 md:py-8 flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Grid TTS */}
        <div className="w-full lg:w-2/3 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="w-full flex flex-1 justify-center items-center overflow-x-auto pb-4 custom-scrollbar">
            <div className="w-max mx-auto px-2">
              <CrosswordGrid
                gridData={puzzle.grid_data}
                wordsData={processedWords}
              />
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4 md:hidden">
            Geser kotak ↔️ jika tertutup layar
          </p>
        </div>

        {/* Clue */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                Mendatar (Across)
              </span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {processedWords
                .filter((w) => w.direction === "HORIZONTAL")
                .map((word, idx) => (
                  <li
                    key={`h-${idx}`}
                    className="text-sm p-2 md:p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent"
                  >
                    <span className="font-bold mr-2 text-blue-600">
                      {word.number}.
                    </span>
                    {word.clue}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                Menurun (Down)
              </span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {processedWords
                .filter((w) => w.direction === "VERTICAL")
                .map((word, idx) => (
                  <li
                    key={`v-${idx}`}
                    className="text-sm p-2 md:p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent"
                  >
                    <span className="font-bold mr-2 text-green-600">
                      {word.number}.
                    </span>
                    {word.clue}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Player;
