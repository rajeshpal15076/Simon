let gameSeq = [];
let userSeq = [];

const gameStartSound = new Audio("game-bonus.mp3");
const gameSound = new Audio("game-music-loop.mp3");
let btns = ["red", "yellow", "green", "blue"];

let level = 0;
let started = false;
let score = 0;

let h3 = document.querySelector("h3");
let highScore = document.querySelector("#Score");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    gameStartSound.play();
    levelUp();
    // while (started) {
    //   setTimeout(function () {
    //     gameSound.play();
    //   }, 1500);
    // }
    setTimeout(function () {
      gameSound.play();
    }, 1500);
  }
});

function btnFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  console.log(gameSeq);
  btnFlash(ranBtn);
}

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameSound.pause();
    let curscore = level;
    // curscore.style.backgroundColor = "yellow";
    h3.innerHTML = `Game Over <b style="background-color: yellow;">Your score was ${level}</b> <br /> Press any key to start`;

    if (level > score) {
      score = level;
    }
    highScore.innerText = `High Score: ${score}`;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
