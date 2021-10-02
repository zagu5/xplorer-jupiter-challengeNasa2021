import {startTime} from './timerCard.js';
import memoryGame from '../memoryGame/memoryGame.js'


export function autoPlay(){
    const btnplay = document.getElementById('btnplay');
    
    btnplay.addEventListener('click', () => {
        startTime();
        memoryGame.generateClicks();
    });
    

};
