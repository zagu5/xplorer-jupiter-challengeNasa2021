const content = document.getElementById('root');
const game = document.getElementById('game');
const sidebar = document.getElementById('sidebar');

import memoryGame from '../memoryGame/memoryGame.js'
import data from "../memoryGame/data.js"


window.addEventListener('load', () => {
    sidebar.innerHTML = memoryGame.createTabGame(data);
    game.innerHTML = memoryGame.createBoard(data).join(" ");
    memoryGame.generateClicks();
});
  