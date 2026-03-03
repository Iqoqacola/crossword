/**
 * Create an empty 2D grid initialized with null values.
 */
const createEmptyGrid = (size) =>
    Array.from({ length: size }, () => Array(size).fill(null));


/**
 * Generate a crossword layout from a list of word objects.
 *
 * @param {Array<{ word: string, [key: string]: any }>} wordsInput - 
 *        Array of word objects. Each object must contain a `word` property.
 *
 * @returns {{
 *   placed_words: Array<Object>,
 *   unplaced_words: Array<Object>,
 *   grid_size: number
 * }}
 *
 */
const generateCrossword = (wordsInput) => {
    const GRID_SIZE = 50; // Temporary grid size
    let grid = createEmptyGrid(GRID_SIZE);

    let words = [...wordsInput].sort((a, b) => b.word.length - a.word.length);
    let placedWords = [];
    let unplacedWords = [];

    /**
     * Place the first word horizontally at the center of the grid.
     *
     * @param {{ word: string }} wordObj - Word object to place.
     */
    const placeFirstWord = (wordObj) => {
        const word = wordObj.word.toUpperCase();
        const startX = Math.floor(GRID_SIZE / 2) - Math.floor(word.length / 2);
        const startY = Math.floor(GRID_SIZE / 2);

        for (let i = 0; i < word.length; i++) {
            grid[startY][startX + i] = word[i];
        }

        placedWords.push({
            ...wordObj,
            word,
            row: startY,
            col: startX,
            direction: 'HORIZONTAL',
        });
    };

    /**
     * Validate whether a word can be placed at a given position.
     *
     * @param {Array<Array<string|null>>} grid - Crossword grid.
     * @param {string} word - Word to validate.
     * @param {number} row - Starting row index.
     * @param {number} col - Starting column index.
     * @param {'HORIZONTAL'|'VERTICAL'} direction - Placement direction.
     *
     * @returns {boolean} True if placement is valid, otherwise false.
     */
    const canPlaceWord = (grid, word, row, col, direction) => {
        const len = word.length;
        const maxRow = grid.length;
        const maxCol = grid[0].length;

        if (direction === 'HORIZONTAL' && col + len > maxCol) return false;
        if (direction === 'VERTICAL' && row + len > maxRow) return false;

        if (direction === 'HORIZONTAL') {
            if (col - 1 >= 0 && grid[row][col - 1] !== null) return false;
            if (col + len < maxCol && grid[row][col + len] !== null) return false;
        } else {
            if (row - 1 >= 0 && grid[row - 1][col] !== null) return false;
            if (row + len < maxRow && grid[row + len][col] !== null) return false;
        }

        for (let i = 0; i < len; i++) {
            const r = direction === 'HORIZONTAL' ? row : row + i;
            const c = direction === 'HORIZONTAL' ? col + i : col;
            const currentLetter = grid[r][c];

            if (currentLetter !== null) {
                if (currentLetter !== word[i]) return false;
            } else {
                if (direction === 'HORIZONTAL') {
                    if (r - 1 >= 0 && grid[r - 1][c] !== null) return false;
                    if (r + 1 < maxRow && grid[r + 1][c] !== null) return false;
                } else {
                    if (c - 1 >= 0 && grid[r][c - 1] !== null) return false;
                    if (c + 1 < maxCol && grid[r][c + 1] !== null) return false;
                }
            }
        }

        return true;
    };

    /**
     * Attempt to place a word by intersecting it with existing placed words.
     *
     * @param {{ word: string }} wordObj - Word object to place.
     * 
     */
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

                        if (
                            canPlaceWord(
                                grid,
                                word,
                                row,
                                col,
                                isHorizontal ? 'HORIZONTAL' : 'VERTICAL'
                            )
                        ) {
                            bestPlacement = {
                                row,
                                col,
                                direction: isHorizontal ? 'HORIZONTAL' : 'VERTICAL',
                            };
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
                word,
                row: bestPlacement.row,
                col: bestPlacement.col,
                direction: bestPlacement.direction,
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
        grid_size: GRID_SIZE,
    };
};

module.exports = { generateCrossword };