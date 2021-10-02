const tabGame = {
    
    containerTab: (data) =>{
        
        const items =[];
        
        data.map((item)=>{
            items.push(`<p class="jupiterElements" data-name="${item.name}">${item.name}</p>`)
        });
        
        return `
            <div class="containerTab">
                <div class="playerContainer">
                    <div id="playerAvatar">
                        <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/04/hipertextual-sony-quiere-que-robot-te-acompane-mientras-juegas-playstation-5-2020548344.jpg?fit=1920%2C1080&ssl=1">
                    </div>
                    <div id="playerName">Nombre de Astronauta</div>
                </div>

                <div class="containerDescription">
                    <div>
                        <h3>ELEMENTOS DEL PLANETA JUPITER</h3>
                        <div class="cardOptions">
                            ${items.join(" ")}
                        </div>
                    </div>
                
                    <div class="containerHits">
                        <label>ACIERTOS</label>
                        <label>0</label>
                    </div>

                    <div class="timeContainer">
                    <p>
                    <span id="minutes">00</span>:
                    <span id="seconds">00</span>
                    </p>
                    </div>

                    <button id="btnplay">PLAY</button>
                </div>

            </div>
        `;
    }

};

export default tabGame;