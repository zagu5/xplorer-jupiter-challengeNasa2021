import startTime from './timerCard.js'

export function autoPlay(){
    const btnplay = document.getElementById('btnplay');
    
    btnplay.addEventListener('click', () => {
        startTime();
        console.log('si estoy');
    });
    
};

//autoPlay();

// export default autoPlay;