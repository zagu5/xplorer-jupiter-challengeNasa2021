import cardGame from './cardGame.js';
import tabGame from './tabGame.js'


const memoryGame = {
    //PARA GENERAR EL TABLERO DE JUEGO DE LAS TARJETAS
    createBoard: (data) => {
      return cardGame.generateCards(data).sort(() => Math.random() - 0.5);
    },

    generateClicks: ()=>{
        cardGame.rotateCard();
    },

    createTabGame: (data) => {
        return tabGame.containerTab(data);
    }
}

export default memoryGame;
