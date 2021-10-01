const content = document.getElementById('root');
import memoryGame from '../memoryGame/memoryGame.js'

window.addEventListener('load', () => {
    content.innerHTML = memoryGame.createBoard().join(" ");
    memoryGame.generateClicks();
});


  