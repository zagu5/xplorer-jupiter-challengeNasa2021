
import data from "../memoryGame/data.js"

const cardGame = {

    arrayDataCard: data,
    
    selections : [],

    generateCards: ()=>{
        
        let cards = [];
        for (let i = 0; i < 24; i++) {
            cards.push(`
            <!-- Rotating card -->
            <div class="card-wrapper">
                <div id="card${i}" class="card" >
            
                    <!-- Front Side -->
                    <div class="face front">
        
                    <!-- Avatar -->
                        <div class="avatar">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdbO7aeUB3HIVp4FroqJBFY0iLz2VEhN8nLvIUgpgVKYKQBMY&s" width:"100%">
                        </div>
                    </div>
                    <!-- Front Side -->
                    
                    <!-- Back Side -->
                    <div id="back${i}" class="face back">
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