function reveal(row, col) {
    if (row >= gameBoard.rows || row < 0) {
        console.log('TAMPERING DETECTED - index out of bounds for reveal function row');
        return;
    }

    if (col >= gameBoard.cols || col < 0) {
        console.log('TAMPERING DETECTED - index out of bounds for reveal function col');
        return;
    }

    let pos = gameBoard.pos(row, col);
    if (gameBoard.data[pos].state == 'revealed')
        return;


    document.getElementById(`square_${pos}`).innerHTML = '';
    if (gameBoard.data[pos].state == 'hidden' || gameBoard.data[pos].state == 'marked') {
        
        if (gameBoard.data[pos].state == 'marked')
            mark(row, col); // for unmarking (to keep count of marked cells)
        
        gameBoard.hidden -= 1;
        
        if (gameBoard.data[pos].bomb) {
            document.getElementById(`square_${pos}`).style.backgroundColor = '#8d3030';
        
            for (let I = 0; I < gameBoard.rows; I++) {
                for (let J = 0; J < gameBoard.cols; J++) {
                    let l = gameBoard.pos(I, J);
        
                    if (gameBoard.data[l].state == 'hidden' && gameBoard.data[l].bomb == false)
                        document.getElementById(`square_${l}`).style.backgroundColor = '#e390a0';
        
                    let neighbour_bombs = 0;
                    for (let i = -1; i <= 1; i++) {
        
                        if (I + i < 0 || I + i >= gameBoard.rows)
                            continue;
        
                        else {
                            for (let j = -1; j <= 1; j++) {
                                if (J + j < 0 || J + j >= gameBoard.cols)
                                    continue;
                                else {
                                    if (gameBoard.data[gameBoard.pos(I + i, J + j)].bomb)
                                        neighbour_bombs += 1;
                                }
                            }
                        }
                    }
        
                    if (neighbour_bombs > 0 && gameBoard.data[l].bomb == false)
                        document.getElementById(`square_${l}`).innerHTML = `${neighbour_bombs}`;
        
                    if (gameBoard.data[l].state == 'hidden' && gameBoard.data[l].bomb == true)
                        document.getElementById(`square_${l}`).style.backgroundColor = '#8d3030';
                    gameBoard.data[l].state = 'revealed';
                }
            }
            youLose();
        }
        else {
            gameBoard.data[pos].state = 'revealed';
            document.getElementById(`square_${pos}`).style.backgroundColor = '#c0c0c0';
            document.getElementById(`square_${pos}`).style.color = '#000000';
            let neighbour_bombs = 0;
            for (let i = -1; i <= 1; i++) {
                if (row + i < 0 || row + i >= gameBoard.rows)
                    continue;
                else {
                    for (let j = -1; j <= 1; j++) {
                        if (col + j < 0 || col + j >= gameBoard.cols)
                            continue;
                        else {
                            if (gameBoard.data[gameBoard.pos(row + i, col + j)].bomb)
                                neighbour_bombs += 1;
                        }
                    }
                }
            }
            if (neighbour_bombs > 0)
                document.getElementById(`square_${pos}`).innerHTML = `${neighbour_bombs}`;
            else {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if ((gameBoard.data[gameBoard.pos(row + i, col + j)] != undefined) && (gameBoard.data[gameBoard.pos(row + i, col + j)].state == 'hidden' || gameBoard.data[gameBoard.pos(row + i, col + j)].state == 'marked'))
                            reveal(row + i, col + j);
                    }
                }
            }
        }
    }
    else if (gameBoard.data[pos].state == 'revealed' && document.getElementById(`square_${pos}`).innerHTML) {
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(i != j)
                    reveal(row + i, col + j);
            }
        }
    }

    gameBoard.data[pos].state = 'revealed';
    if (gameBoard.hidden == 0)
        youWin();
}

function mark(row, col) {
    if (row >= gameBoard.rows || row < 0) {
        console.log('TAMPERING DETECTED - index out of bounds for reveal function row');
        return;
    }

    if (col >= gameBoard.rows || col < 0) {
        console.log('TAMPERING DETECTED - index out of bounds for reveal function col');
        return;
    }

    let pos = gameBoard.pos(row, col);
    if (gameBoard.data[pos].state == 'hidden') {
        document.getElementById(`square_${pos}`).style.color = '#ffffff';
        document.getElementById(`square_${pos}`).innerHTML = 'X';
        gameBoard.data[pos].state = 'marked';
        gameBoard.mark += 1;
    }
    else if (gameBoard.data[pos].state == 'marked') {
        document.getElementById(`square_${pos}`).style.color = '#ffffff';
        document.getElementById(`square_${pos}`).innerHTML = '';
        gameBoard.data[pos].state = 'hidden';
        gameBoard.mark -= 1;
    }

    document.getElementById('bombs_marked').innerHTML = gameBoard.mark;
}