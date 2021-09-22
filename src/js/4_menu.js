function begin_game(mode) {
    document.getElementById('menu_table').hidden = true;

    switch (mode) {
        case 'easy':
            gameBoard.initialize(10, 10, 10);
            break;
        case 'medium':
            gameBoard.initialize(20, 15, 30);
            break;
        case 'hard':
            gameBoard.initialize(20, 30, 70);
            break;
    }

    gameTimer.start();

    gameBoard.render();
    document.getElementById('gamearea').hidden = false;
    document.getElementById('total_bombs').innerHTML = gameBoard.bomb;
    document.getElementById('bombs_marked').innerHTML = gameBoard.mark;
    document.getElementById('side_button').innerHTML = 'QUIT';
}

function show_menu() {
    document.getElementById('gamearea').hidden = true;
    document.getElementById('menu_table').hidden = false;
    document.getElementById('result').innerHTML = '';
    gameBoard.reset();
}