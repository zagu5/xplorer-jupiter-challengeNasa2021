const content = document.getElementById('root');
const game = document.getElementById('game');
const sidebar = document.getElementById('sidebar');

import memoryGame from '../memoryGame/memoryGame.js'

window.addEventListener('load', () => {
    game.innerHTML = memoryGame.createBoard().join(" ");
    memoryGame.generateClicks();
    sidebar.innerHTML = memoryGame.createTabGame();
});


  