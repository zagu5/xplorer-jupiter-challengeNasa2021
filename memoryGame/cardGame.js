
const cardGame = {

    arrayDataCard: [
        { "id": 1, "name": "agua", "url": "../memoryGame/assets/images/agua.jpg"},
      
        { "id": 2, "name": "oxígeno", "url": "../memoryGame/assets/images/oxigeno.jpg" },
      
        { "id": 3, "name": "azufre", "url": "../memoryGame/assets/images/azufre.jpg" },
      
        { "id": 4, "name": "nitrógeno", "url": "../memoryGame/assets/images/nitrogeno.jpg" },
      
        { "id": 5, "name": "amoníaco", "url": "../memoryGame/assets/images/amoniaco.jpg" },
      
        { "id": 6, "name": "metano", "url": "../memoryGame/assets/images/metano.jpg" },
      
        { "id": 7, "name": "ácido sulfhídrico", "url": "../memoryGame/assets/images/acido sulfurico.jpg" },
      
        { "id": 8, "name": "temperaturas", "url": "../memoryGame/assets/images/temperaturas.jpg" },
      
        { "id": 9, "name": "hidrógeno molecular", "url": "../memoryGame/assets/images/hidrogenoMolecular.jpg" },
      
        { "id": 10, "name": "dióxido de carbono", "url": "../memoryGame/assets/images/dioxido de carbono.jpg" },
      
        { "id": 11, "name": "Galileo", "url": "../memoryGame/assets/images/galileo sonda.jpg" },
      
        { "id": 12, "name": "Cassini-Huygens", "url": "../memoryGame/assets/images/Cassini-Huygens.jpg" }
      ],

      selections : [],
      

    generateCards: ()=>{
        
        let cards = [];
        `<div class='btnPlay'>
        <button type="" id="btnPlay">PLAY</button>
    </div>`
        for (let i = 0; i < 24; i++) {
            cards.push(`
            <!-- Rotating card -->
            
            <div class="card-wrapper">
                <div id="card${i}" class="card" >
            
                    <!-- Front Side -->
                    <div class="face front">
        
                    <!-- Avatar -->
                        <div class="avatar">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdbO7aeUB3HIVp4FroqJBFY0iLz2VEhN8nLvIUgpgVKYKQBMY&s">
                        </div>
                    </div>
                    <!-- Front Side -->
                    
                    <!-- Back Side -->
                    <div id="back${i}" class="face back">
                        <div class="card-body">
                            <!-- Content -->
                            <img src="${cardGame.arrayDataCard[0].url}">
                        </div>
                    </div>
                    <!-- Back Side -->
                            
                </div>
            </div>
            <!-- Rotating card -->
            `)
            if (i % 2 == 1) {
                cardGame.arrayDataCard.splice(0, 1)
            }
        }//END FOR
        
        return cards;
    },

    rotateCard: ()=> {
        for (let i = 0; i < 24; i++) {
            let card = document.getElementById("card" + i);
            card.addEventListener('click', () => {
                if (card.style.transform != "rotateY(180deg)") {
                    card.style.transform = "rotateY(180deg)"
                    cardGame.selections.push(i);
                }
                if (cardGame.selections.length == 2) {
                    cardGame.deselect(cardGame.selections);
                    cardGame.selections = [];
                }
              });
        }
    },

    deselect:(selections)=> {
        setTimeout(() => {
            let backCard1 = document.getElementById("back" + selections[0])
            let backCard2 = document.getElementById("back" + selections[1])
            if (backCard1.innerHTML != backCard2.innerHTML) {
                let tarjeta1 = document.getElementById("card" + selections[0])
                let tarjeta2 = document.getElementById("card" + selections[1])
                tarjeta1.style.transform = "rotateY(0deg)"
                tarjeta2.style.transform = "rotateY(0deg)"
            }else{
                backCard1.style.background = "plum"
                backCard2.style.background = "plum"
            }
        }, 1000);
    }


};

export default cardGame;