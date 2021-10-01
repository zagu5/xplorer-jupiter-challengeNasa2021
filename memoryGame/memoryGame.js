import cardGame from './cardGame.js'

const memoryGame = {

  
    //PARA GENERAR EL TABLERO DE JUEGO DE LAS TARJETAS
    createBoard: () => {
      `<div class='btnPlay'>
      <button type="" id="btnPlay">PLAY</button>
  </div>`
      return cardGame.generateCards().sort(() => Math.random() - 0.5);
    },

    generateClicks: ()=>{
        cardGame.rotateCard();
    }

}

export default memoryGame;
