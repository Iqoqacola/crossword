import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CrosswordGrid = ({ gridData, wordsData }) => {
  const { rows, cols, cells } = gridData;
  const navigate = useNavigate();

  const [userAnswers, setUserAnswers] = useState(() =>
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill("")),
  );
  const [activeCell, setActiveCell] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const inputRefs = useRef(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null)),
  );

  const numberMap = {};
  wordsData.forEach((w) => {
    numberMap[`${w.row}-${w.col}`] = w.number;
  });

  useEffect(() => {
    let isComplete = true;
    let isAllCorrect = true;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (cells[r][c] !== null) {
          if (userAnswers[r][c] === "") {
            isComplete = false;
            isAllCorrect = false;
            break;
          }
          if (userAnswers[r][c] !== cells[r][c]) {
            isAllCorrect = false;
          }
        }
      }
    }

    if (isComplete && isAllCorrect) {
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 300);
    } else {
      setShowSuccessModal(false);
    }
  }, [userAnswers, cells, rows, cols]);

  const handleChange = (r, c, value) => {
    let val = value;
    const oldChar = userAnswers[r][c];

    if (val === "") {
      const newAnswers = [...userAnswers];
      newAnswers[r][c] = "";
      setUserAnswers(newAnswers);
      return;
    }

    if (val.length > 1) {
      val = val.replace(oldChar, "");
      val = val.slice(-1);
    }
    val = val.toUpperCase();

    const newAnswers = [...userAnswers];
    newAnswers[r][c] = val;
    setUserAnswers(newAnswers);

    if (val !== "") {
      if (c + 1 < cols && cells[r][c + 1] !== null)
        inputRefs.current[r][c + 1].focus();
      else if (r + 1 < rows && cells[r + 1][c] !== null)
        inputRefs.current[r + 1][c].focus();
    }
  };

  const handleKeyDown = (e, r, c) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (userAnswers[r][c] !== "") {
        const newAnswers = [...userAnswers];
        newAnswers[r][c] = "";
        setUserAnswers(newAnswers);
      } else {
        if (c - 1 >= 0 && cells[r][c - 1] !== null)
          inputRefs.current[r][c - 1].focus();
        else if (r - 1 >= 0 && cells[r - 1][c] !== null)
          inputRefs.current[r - 1][c].focus();
      }
    } else if (
      e.key === "ArrowRight" &&
      c + 1 < cols &&
      cells[r][c + 1] !== null
    ) {
      inputRefs.current[r][c + 1].focus();
    } else if (
      e.key === "ArrowLeft" &&
      c - 1 >= 0 &&
      cells[r][c - 1] !== null
    ) {
      inputRefs.current[r][c - 1].focus();
    } else if (
      e.key === "ArrowDown" &&
      r + 1 < rows &&
      cells[r + 1][c] !== null
    ) {
      inputRefs.current[r + 1][c].focus();
    } else if (e.key === "ArrowUp" && r - 1 >= 0 && cells[r - 1][c] !== null) {
      inputRefs.current[r - 1][c].focus();
    }
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 p-4">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center transform scale-100 animate-bounce-short border border-slate-100">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-inner">
              <span className="text-3xl md:text-4xl">🎉</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2">
              Luar Biasa!
            </h2>
            <p className="text-slate-500 mb-6 md:mb-8 leading-relaxed text-sm">
              Kamu berhasil menyelesaikan teka-teki silang ini dengan sempurna.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors text-sm md:text-base"
              >
                Lihat Hasil Grid
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md shadow-blue-200 text-sm md:text-base"
              >
                Main Puzzle Lain
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-slate-800 border-2 border-slate-800 shadow-lg rounded-sm w-max"
        style={{
          display: "grid",
          /* Ukuran min di HP 32px, di PC 46px */
          gridTemplateColumns: `repeat(${cols}, minmax(32px, 46px))`,
          gap: "1px",
        }}
      >
        {cells.map((row, r) =>
          row.map((cellValue, c) => {
            const isBlock = cellValue === null;
            const cellNum = numberMap[`${r}-${c}`];

            let cellColor = "bg-white";
            if (!isBlock && userAnswers[r][c] !== "") {
              if (userAnswers[r][c] === cellValue) {
                cellColor = "bg-green-100 text-green-700 font-extrabold";
              } else {
                cellColor = "bg-red-100 text-red-600 font-extrabold";
              }
            }

            if (isBlock) {
              return (
                <div
                  key={`${r}-${c}`}
                  className="bg-slate-800 w-full aspect-square"
                ></div>
              );
            }

            return (
              <div
                key={`${r}-${c}`}
                className="relative w-full aspect-square bg-white"
              >
                {cellNum && (
                  <span className="absolute top-[1px] left-[3px] md:top-0.5 md:left-1 text-[9px] md:text-[11px] text-slate-500 font-bold z-20 pointer-events-none select-none">
                    {cellNum}
                  </span>
                )}

                <input
                  ref={(el) => (inputRefs.current[r][c] = el)}
                  type="text"
                  value={userAnswers[r][c]}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  onClick={(e) => e.target.select()}
                  onFocus={(e) => {
                    setActiveCell(`${r}-${c}`);
                    e.target.select();
                  }}
                  className={`w-full h-full text-center text-lg md:text-2xl uppercase outline-none focus:bg-yellow-50 transition-colors cursor-text caret-transparent appearance-none rounded-none m-0 p-0
                                    ${cellColor} ${activeCell === `${r}-${c}` ? "bg-yellow-100 ring-2 md:ring-4 ring-yellow-400 z-10 relative shadow-lg" : ""}`}
                />
              </div>
            );
          }),
        )}
      </div>

      <style>{`
                @keyframes bounce-short {
                    0% { transform: scale(0.9); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-bounce-short {
                    animation: bounce-short 0.4s ease-out forwards;
                }
            `}</style>
    </div>
  );
};

export default CrosswordGrid;
