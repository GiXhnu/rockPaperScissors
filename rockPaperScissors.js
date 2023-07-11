
let score = JSON.parse(localStorage.getItem('score')) || {
  Wins : 0,
  Losses : 0,
  Ties : 0
}; 
updateScore();

const rockButton = document.querySelector('.rockButton');
const paperButton = document.querySelector('.paperButton');
const scissorsButton = document.querySelector('.scissorsButton');
const buttonReset = document.querySelector('.jsButtonReset');
const autoPlayButton = document.querySelector('.jsAutoPlay');
rockButton.addEventListener('click',()=>{
  endResult('Rock');
});
paperButton.addEventListener('click',()=>{
  endResult('Paper');
});
scissorsButton.addEventListener('click',()=>{
  endResult('Scissors');
});
buttonReset.addEventListener('click',()=>{
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        localStorage.removeItem('score'); 
        updateScore();
});
autoPlayButton.addEventListener('click',()=>{
  autoPlay();
})


let isPlaying = false;
let intervalId;

function autoPlay(){
  if(!isPlaying){ 
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        endResult(playerMove);
      }, 1000);
      isPlaying = true;
}else { 
    clearInterval(intervalId);
    isPlaying = false;
}


const buttonElement = document.querySelector('.js-autoPlay');
    if(buttonElement.innerHTML === 'Auto Play'){
        buttonElement.innerHTML = 'Stop Play';
        buttonElement.classList.add('is-stopPlay');
    }else{
        buttonElement.innerHTML = 'Auto Play';
        buttonElement.classList.remove('is-stopPlay'); 
    }
          
}

function endResult(playerMove){
    const computerMove = pickComputerMove();
        
        let result = '';
        if (playerMove === 'Scissors'){
                if(computerMove === 'Rock'){
                  result = 'You lose.';
                }else if(computerMove === 'Paper'){
                  result = 'You Win.';
                }else if(computerMove === 'Scissors'){
                  result = 'Tie.';
                }
          }else if (playerMove === 'Paper'){
                if(computerMove === 'Rock'){
                  result = 'You Win.';
                }else if(computerMove === 'Paper'){
                  result = 'Tie.';
                }else if(computerMove === 'Scissors'){
                  result = 'You lose.';
                }
          }else if (playerMove === 'Rock'){
                if(computerMove === 'Rock'){
                  result = 'Tie.';
                }else if(computerMove === 'Paper'){
                  result = 'You lose.';
                }else if(computerMove === 'Scissors'){
                  result = 'You Win.';
                }
          }
          document.querySelector('.result').innerHTML = result;

          if (result === 'You Win.'){
            score.Wins += 1;
          }else if(result === 'You lose.'){
            score.Losses +=1;
          }else if(result === 'Tie.'){
            score.Ties += 1;
          }
          
      localStorage.setItem('score',JSON.stringify(score));
updateScore();
document.querySelector('.js-move').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="iconHand"> <img src="images/${computerMove}-emoji.png" class="iconHand"> Computer`;  
  }


function updateScore(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function pickComputerMove(){

  let randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  }else if(randomNumber >= 2/3 && randomNumber <1){
    computerMove = 'Scissors';
  }
  return computerMove;

}
