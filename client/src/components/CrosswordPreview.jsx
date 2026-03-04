import React, { useState } from "react";

const CrosswordPreview = ({ gridData }) => {
  const [showAnswers, setShowAnswers] = useState(true);

  if (!gridData || !gridData.cells || !gridData.placed_words) return null;

  const { rows, cols, cells, placed_words } = gridData;

  const numberMap = {};
  placed_words.forEach((w) => {
    numberMap[`${w.row}-${w.col}`] = w.number;
  });

  const CELL_SIZE = 40;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-6">
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-xl text-sm transition-colors border border-indigo-100"
        >
          {showAnswers ? "Sembunyikan Jawaban" : "Tampilkan Jawaban"}
        </button>
      </div>

      <div className="w-full overflow-x-auto pb-6 flex justify-center">
        <div
          className="bg-slate-900 border-2 border-slate-900 rounded-sm p-[1px] shadow-xl shadow-slate-200"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
            gap: "1px",
            width: "max-content",
          }}
        >
          {cells.map((row, r) =>
            row.map((cellValue, c) => {
              const isBlock = cellValue === null;
              const cellNum = numberMap[`${r}-${c}`];

              if (isBlock) {
                return (
                  <div
                    key={`${r}-${c}`}
                    className="bg-slate-900"
                    style={{
                      width: `${CELL_SIZE}px`,
                      height: `${CELL_SIZE}px`,
                    }}
                  ></div>
                );
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className="bg-white relative flex items-center justify-center"
                  style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                >
                  {cellNum && (
                    <span className="absolute top-[1px] left-[3px] text-[10px] font-black text-slate-400 z-10 pointer-events-none">
                      {cellNum}
                    </span>
                  )}
                  <span
                    className={`text-xl font-black uppercase z-0 transition-opacity duration-300 ${
                      showAnswers ? "opacity-100 text-indigo-600" : "opacity-0"
                    }`}
                  >
                    {cellValue}
                  </span>
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};

export default CrosswordPreview;
