function youWin() {
    document.getElementById('result').innerHTML = 'YOU WIN !!'
    document.getElementById('result').style.color = '#288028'
    for(let row = 0; row < gameBoard.rows; row++) {
        for(let col = 0; col < gameBoard.cols; col++) {
            let pos = gameBoard.pos(row, col);
            if(gameBoard.data[pos].state == 'revealed')
                document.getElementById(`square_${pos}`).style.backgroundColor = '#b0e0b0';
            else
                document.getElementById(`square_${pos}`).style.backgroundColor = '#206020';
        }
    }
}

function youLose() {
    document.getElementById('result').innerHTML = 'YOU LOSE !!'
    document.getElementById('result').style.color = '#802828'
}