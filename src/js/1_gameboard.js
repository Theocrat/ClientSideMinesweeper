const gameBoard = {
    'data': [],
    'rows': 0,
    'cols': 0,
    'bomb': 0,
    'mark': 0,
    'hidden': 0,

    // Methods

    'initialize': (nrows, ncols, nbomb) => {
        gameBoard.rows = nrows;
        gameBoard.cols = ncols;
        gameBoard.bomb = nbomb;
        gameBoard.mark = 0;
        gameBoard.hidden = (nrows * ncols) - nbomb;

        for (let i = 0; i < (nrows * ncols); i++)
            gameBoard.data.push({
                'state': 'hidden',
                'bomb': false
            })

        let bomb_count = nbomb;
        while (bomb_count > 0) {
            let pos = Math.floor(Math.random() * nrows * ncols);
            if (gameBoard.data[pos].bomb)
                continue;
            else {
                bomb_count -= 1;
                gameBoard.data[pos].bomb = true;
            }
        }
    },

    'render': () => {
        let gb = document.getElementById('gameboard');
        for (let i = 0; i < gameBoard.rows; i++) {
            let row_html = '<tr>';
            for (let j = 0; j < gameBoard.cols; j++) {
                row_html += `<td> <button id="square_${gameBoard.pos(i, j)}" class="gameboard_square" onclick="mark(${i},${j})" ondblclick="reveal(${i},${j})"> </button> </td>`;
            }
            row_html += '</tr>'
            gb.innerHTML += row_html;
        }
    },

    'reset': () => {
        gameBoard.data = [];
        gameBoard.rows = 0;
        gameBoard.cols = 0;
        gameBoard.bomb = 0;
        gameBoard.mark = 0;
        gameBoard.hidden = 0;
        document.getElementById('gameboard').innerHTML = ''
    },

    'pos': (row, col) => {
        let pos = row * gameBoard.cols;
        pos += col;
        return pos;
    }
};
