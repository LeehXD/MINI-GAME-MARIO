const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const menu = document.querySelector('.menu')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')



var choiceUniv = "mario"

const universe = {
  "mario": {
    "avatar" : "./img/mario.gif",
    "gameover" : "./img/game-over.png",
    "enemy" : "./img/pipe.png",
    "audioStart" : new Audio('./soung/audio_theme.mp3'),
    "audioGameOver" : new Audio('./soung/audio_gameover.mp3')
  },
  "sonic":{
    "avatar" : "./img/gif_sonic_correndo.gif",
    "gameover" : "./img/sonic_a.png",
    "enemy" : "./img/robotnik_a.png",
    "audioStart" : new Audio('./soung/sonicinicio1.m4a'),
    "audioGameOver" : new Audio('./soung/sonicmorre.m4a')
  },
  "mickey":{
    "avatar" : "./img/mickey_run.gif",
    "gameover" : "./img/mickey_dano.png",
    "enemy" : "./img/terreno_mikey.png",
    "audioStart" : new Audio('./soung/audio_theme.mp3'),
    "audioGameOver" : new Audio('./soung/audio_gameover.mp3')
  }
}



const startGame = (varChoice) => {

  choiceUniv = varChoice;
  mario.src = universe[choiceUniv].avatar;
  pipe.src = universe[choiceUniv].enemy;
  pipe.classList.add('pipe-animation')
  
  //start.style.display = 'none'
  menu.style.display = 'none'

  // audio
  universe[choiceUniv].audioStart.play()
}

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  mario.src = universe[choiceUniv].avatar;
  mario.style.width = '150px';
  mario.style.bottom = '0';
  start.style.display = 'none';
  universe[choiceUniv].audioGameOver.pause()
  universe[choiceUniv].audioGameOver.currentTime = 0;
  universe[choiceUniv].audioStart.play()
  universe[choiceUniv].audioStart.currentTime = 0;
}

const jump = () => {
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation');
      pipe.style.left = `${pipePosition}px`;
      mario.classList.remove('.jump');
      mario.style.bottom = `${marioPosition}px`;
      mario.src = universe[choiceUniv].gameover;
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';    
      
      function stopAudioStart() {
        universe[choiceUniv].audioStart.pause()
      }
      stopAudioStart()
      
      universe[choiceUniv].audioGameOver.play()
      
      function stopAudio() {
        universe[choiceUniv].audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'
      
      clearInterval(loop)
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})