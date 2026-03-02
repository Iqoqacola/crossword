const createEmptyGrid = (size) => Array.from({ length: size }, () => Array(size).fill(null));

const generateCrossword = (wordsInput) => {
    const GRID_SIZE = 50; // Grid temp
    let grid = createEmptyGrid(GRID_SIZE);

    let words = [...wordsInput].sort((a, b) => b.word.length - a.word.length);
    let placedWords = [];
    let unplacedWords = [];

    const placeFirstWord = (wordObj) => {
        const word = wordObj.word.toUpperCase();
        const startX = Math.floor(GRID_SIZE / 2) - Math.floor(word.length / 2);
        const startY = Math.floor(GRID_SIZE / 2);

        for (let i = 0; i < word.length; i++) {
            grid[startY][startX + i] = word[i];
        }

        placedWords.push({
            ...wordObj,
            word: word,
            row: startY,
            col: startX,
            direction: 'HORIZONTAL'
        });
    };

    const canPlaceWord = (word, row, col, direction) => {
        if (direction === 'HORIZONTAL') {
            if (col < 0 || col + word.length > GRID_SIZE) return false;
            for (let i = 0; i < word.length; i++) {
                const cell = grid[row][col + i];
                if (cell !== null && cell !== word[i]) return false;
                if (cell === null) {
                    if (row > 0 && grid[row - 1][col + i] !== null) return false;
                    if (row < GRID_SIZE - 1 && grid[row + 1][col + i] !== null) return false;
                }
            }
            if (col > 0 && grid[row][col - 1] !== null) return false;
            if (col + word.length < GRID_SIZE && grid[row][col + word.length] !== null) return false;
        } else {
            if (row < 0 || row + word.length > GRID_SIZE) return false;
            for (let i = 0; i < word.length; i++) {
                const cell = grid[row + i][col];
                if (cell !== null && cell !== word[i]) return false;
                if (cell === null) {
                    if (col > 0 && grid[row + i][col - 1] !== null) return false;
                    if (col < GRID_SIZE - 1 && grid[row + i][col + 1] !== null) return false;
                }
            }
            if (row > 0 && grid[row - 1][col] !== null) return false;
            if (row + word.length < GRID_SIZE && grid[row + word.length][col] !== null) return false;
        }
        return true;
    };

    const placeWord = (wordObj) => {
        const word = wordObj.word.toUpperCase();
        let bestPlacement = null;

        for (let p of placedWords) {
            for (let i = 0; i < word.length; i++) {
                for (let j = 0; j < p.word.length; j++) {
                    if (word[i] === p.word[j]) {
                        const isHorizontal = p.direction === 'VERTICAL';
                        const row = isHorizontal ? p.row + j : p.row - i;
                        const col = isHorizontal ? p.col - i : p.col + j;

                        if (canPlaceWord(word, row, col, isHorizontal ? 'HORIZONTAL' : 'VERTICAL')) {
                            bestPlacement = { row, col, direction: isHorizontal ? 'HORIZONTAL' : 'VERTICAL' };
                            break;
                        }
                    }
                }
                if (bestPlacement) break;
            }
            if (bestPlacement) break;
        }

        if (bestPlacement) {
            for (let i = 0; i < word.length; i++) {
                if (bestPlacement.direction === 'HORIZONTAL') {
                    grid[bestPlacement.row][bestPlacement.col + i] = word[i];
                } else {
                    grid[bestPlacement.row + i][bestPlacement.col] = word[i];
                }
            }
            placedWords.push({
                ...wordObj,
                word: word,
                row: bestPlacement.row,
                col: bestPlacement.col,
                direction: bestPlacement.direction
            });
        } else {
            unplacedWords.push(wordObj);
        }
    };

    if (words.length > 0) {
        placeFirstWord(words[0]);
        for (let i = 1; i < words.length; i++) {
            placeWord(words[i]);
        }
    }

    return {
        placed_words: placedWords,
        unplaced_words: unplacedWords,
        grid_size: GRID_SIZE
    };
};

module.exports = { generateCrossword };