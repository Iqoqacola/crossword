import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CrosswordPreview from "../components/CrosswordPreview";

const AdminCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [words, setWords] = useState([
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
  ]);
  const [gridData, setGridData] = useState(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleWordChange = (index, field, value) => {
    const newWords = [...words];
    if (field === "word")
      newWords[index][field] = value.toUpperCase().replace(/\s/g, "");
    else newWords[index][field] = value;
    setWords(newWords);
    setGridData(null);
  };

  const addWordInput = () => setWords([...words, { word: "", clue: "" }]);

  const removeWordInput = (index) => {
    setWords(words.filter((_, i) => i !== index));
    setGridData(null);
  };

  const handleGeneratePreview = async () => {
    setError("");
    const validWords = words.filter(
      (w) => w.word.trim() !== "" && w.clue.trim() !== "",
    );

    if (validWords.length < 5)
      return setError("Minimal 5 kata dan petunjuk terisi!");

    setIsGenerating(true);
    try {
      const response = await api.post("/puzzles/generate", {
        words_data: validWords,
      });

      if (response.data.success) {
        const placedWords = response.data.data.placed_words;
        const unplacedWords = response.data.data.unplaced_words;

        if (unplacedWords && unplacedWords.length > 0) {
          const failedWords = unplacedWords.map((w) => w.word).join(", ");
          throw new Error(
            `Gagal menyusun grid. Kata berikut tidak memiliki irisan huruf yang pas: ${failedWords}. Silakan ganti kata yang lain.`,
          );
        }

        if (!placedWords || placedWords.length === 0) {
          throw new Error("Kata tidak bisa dirangkai sama sekali.");
        }

        let minRow = Infinity,
          maxRow = -Infinity;
        let minCol = Infinity,
          maxCol = -Infinity;

        placedWords.forEach((w) => {
          const len = w.word.length;
          const endRow = w.direction === "VERTICAL" ? w.row + len - 1 : w.row;
          const endCol = w.direction === "HORIZONTAL" ? w.col + len - 1 : w.col;

          if (w.row < minRow) minRow = w.row;
          if (endRow > maxRow) maxRow = endRow;
          if (w.col < minCol) minCol = w.col;
          if (endCol > maxCol) maxCol = endCol;
        });

        minRow = Math.max(0, minRow - 1);
        maxRow += 1;
        minCol = Math.max(0, minCol - 1);
        maxCol += 1;

        const rows = maxRow - minRow + 1;
        const cols = maxCol - minCol + 1;
        const cells = Array.from({ length: rows }, () =>
          Array(cols).fill(null),
        );

        const finalPlacedWords = placedWords.map((w, index) => {
          const startR = w.row - minRow;
          const startC = w.col - minCol;

          for (let i = 0; i < w.word.length; i++) {
            const r = w.direction === "VERTICAL" ? startR + i : startR;
            const c = w.direction === "HORIZONTAL" ? startC + i : startC;
            cells[r][c] = w.word[i].toUpperCase();
          }

          const originalWord = validWords.find(
            (vw) => vw.word.toUpperCase() === w.word.toUpperCase(),
          );

          return {
            ...w,
            row: startR,
            col: startC,
            number: index + 1,
            clue: originalWord ? originalWord.clue : "",
          };
        });

        setGridData({
          rows,
          cols,
          cells,
          placed_words: finalPlacedWords,
        });
      }
    } catch (err) {
      setError(
        err.message || err.response?.data?.message || "Gagal generate preview.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePuzzle = async () => {
    if (!gridData) return setError("Generate preview dulu!");
    try {
      await api.post("/puzzles/create", {
        title: title || "Tanpa Judul",
        words_data: gridData.placed_words,
        grid_data: {
          rows: gridData.rows,
          cols: gridData.cols,
          cells: gridData.cells,
        },
      });
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Gagal menyimpan puzzle.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Buat Teka-Teki Baru
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* BAGIAN KIRI: FORM  */}
          <div className="w-full lg:w-[45%] shrink-0 flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                Judul Puzzle
              </label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all outline-none text-lg font-bold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Cth: Pengetahuan Alam"
              />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    Daftar Kata (Minimal 5)
                  </label>
                  <p className="text-sm text-slate-500 mt-1">
                    Gunakan kata tanpa spasi.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {words.map((item, index) => (
                  <div key={index} className="flex gap-3 group items-center">
                    <div className="w-8 flex justify-center text-slate-400 font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      placeholder="KATA"
                      className="w-1/3 p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none uppercase font-black text-indigo-600 tracking-tighter"
                      value={item.word}
                      onChange={(e) =>
                        handleWordChange(index, "word", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Tulis petunjuk..."
                      className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none font-medium"
                      value={item.clue}
                      onChange={(e) =>
                        handleWordChange(index, "clue", e.target.value)
                      }
                    />
                    {words.length > 5 ? (
                      <button
                        onClick={() => removeWordInput(index)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    ) : (
                      <div className="w-[44px]"></div>
                    )}
                  </div>
                ))}

                <button
                  onClick={addWordInput}
                  className="ml-11 mt-2 p-3 text-indigo-600 font-bold hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 text-sm"
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
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Tambah Baris
                </button>
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: PREVIEW GRID */}
          <div className="w-full lg:w-[55%] sticky top-24">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col overflow-hidden min-h-[500px]">
              {/* Header Panel Kanan */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                  Live Preview Grid
                </h2>
                <button
                  onClick={handleGeneratePreview}
                  disabled={isGenerating}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all text-sm flex items-center gap-2 ${
                    isGenerating
                      ? "bg-slate-200 text-slate-500"
                      : "bg-slate-800 hover:bg-black text-white"
                  }`}
                >
                  {isGenerating ? "Memproses..." : "Generate"}
                </button>
              </div>

              {/* Area Render Grid */}
              <div className="flex-1 bg-[#f8fafc] p-8 flex items-center justify-center overflow-auto pattern-dots">
                {gridData ? (
                  <div className="transform scale-90 sm:scale-100 origin-center transition-transform">
                    <CrosswordPreview
                      key={JSON.stringify(gridData)}
                      gridData={gridData}
                      wordsData={words}
                    />
                  </div>
                ) : (
                  <div className="text-center text-slate-400 max-w-xs">
                    <div className="w-16 h-16 bg-white border-2 border-dashed border-slate-300 rounded-2xl mx-auto mb-4 flex items-center justify-center text-slate-300">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                        ></path>
                      </svg>
                    </div>
                    <p className="font-medium">
                      Isi minimal 5 kata di sebelah kiri, lalu klik{" "}
                      <span className="text-slate-600 font-bold">Generate</span>{" "}
                      untuk melihat bentuk teka-teki silang.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Action */}
              <div className="p-6 border-t border-slate-100 bg-white">
                <button
                  onClick={handleSavePuzzle}
                  disabled={!gridData}
                  className={`w-full py-4 rounded-xl font-black transition-all flex justify-center items-center gap-2 ${
                    !gridData
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform hover:-translate-y-1"
                  }`}
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
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    ></path>
                  </svg>
                  CREATE
                </button>
              </div>
            </div>
            {/* ERROR */}
            {error && (
              <div className="p-4 mt-6 bg-red-50 text-red-600 rounded-2xl font-bold text-sm border border-red-100 flex items-center gap-2">
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCreate;
