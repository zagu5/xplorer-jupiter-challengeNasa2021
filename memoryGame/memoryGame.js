import cardGame from './cardGame.js'
import {autoPlay} from './playTime.js'
import tab from './tabGame.js'

const memoryGame = {

  
    //PARA GENERAR EL TABLERO DE JUEGO DE LAS TARJETAS
    createBoard: () => {
  
      return cardGame.generateCards().sort(() => Math.random() - 0.5);
    },

    generateClicks: ()=>{
        cardGame.rotateCard();
    },

    createTabGame: () => {
      return tab.containerTab();
  },


    btnPlay: () => {
      autoPlay();
    }

}

export default memoryGame;
