"use strict";

window.addEventListener("load", start);

let points = 1;
let lives = 3;
let sprite;

function start() {
  //aktiver basis animationerne
  document.querySelector("#sprite_container01").classList.add("right_left");
  document.querySelector("#sprite_container02").classList.add("updown");
  document.querySelector("#sprite_container03").classList.add("left_right");
  document.querySelector("#sprite_container04").classList.add("wickerman");
  document.querySelector("#sprite_container05").classList.add("updown");

  //gør sprites klikbare
  document
    .querySelector("#sprite_container01")
    .addEventListener("click", sprite01Clicked);
  document
    .querySelector("#sprite_container02")
    .addEventListener("click", sprite02Clicked);
  document
    .querySelector("#sprite_container03")
    .addEventListener("click", sprite03Clicked);
  document
    .querySelector("#sprite_container04")
    .addEventListener("click", sprite04Clicked);
  document
    .querySelector("#sprite_container05")
    .addEventListener("click", sprite05Clicked);
}

//enemy01
function sprite01Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "01";

  enemyHit();
  incrementPoints();
}

//enemy02
function sprite02Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "02";

  enemyHit();
  incrementPoints();
}

//enemy03
function sprite05Clicked() {
  console.log(`#sprite_container${sprite}`);
  sprite = "05";

  enemyHit();
  incrementPoints();
}

function enemyHit() {
  // gør den ikke klikbar

  // ...enemy${sprtie}Clicked
  document
    .querySelector(`#sprite_container${sprite}`)
    .removeEventListener("click", enemy02Clicked);

  //stop animation
  document.querySelector(`#sprite_container${sprite}`).classList.add("paused");

  // fjern sprite
  document.querySelector(`#sprite${sprite}`).classList.add("fade_out");

  // tilføjer animation end til at kalde næste funktion....
  document
    .querySelector(`#sprite_container${sprite}`)
    .addEventListener("animationend", enemyMoved);
}

// Der mangler en form for reseet/respawn så den ikke afspiller hvor den stoppede...

function enemyMoved() {
  // animation end fjernes
  document
    .querySelector(`#sprite_container${sprite}`)
    .removeEventListener("animationend", enemyMoved);
  // fjern fade_out
  document.querySelector(`#sprite${sprite}`).classList.remove("fade_out");
  //fjren paused
  document
    .querySelector(`#sprite_container${sprite}`)
    .classList.remove("paused");

  // genstart animationen (SPECIFIKKE ANIMATIONER)

  if (sprite == "01") {
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.remove("right_left");
    document.querySelector(`#sprite_container${sprite}`).offsetDown;
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.add("right_left");
  } else {
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.remove("updown");
    document.querySelector(`#sprite_container${sprite}`).offsetDown;
    document
      .querySelector(`#sprite_container${sprite}`)
      .classList.add("updown");
  }

  // elementet bliver klikbart igen...
  document
    .querySelector(`#sprite_container${sprite}`)
    .addEventListener("click", enemy02Clicked);
}

function incrementPoints() {
  displayPoints();
  points++;
}

function displayPoints() {
  document.querySelector("#points").textContent = points;
}

//kvinden
function sprite03Clicked() {
  console.log("friendly01Clicked");
  friendlyHit();
  looseLife();
}
// præsten
function sprite04Clicked() {
  console.log("friendly02Clicked");
  friendlyHit();
  looseLife();
}

function friendlyHit() {
  console.log(`${sprite}`);
}

function looseLife() {
  if (lives > 0) {
    removeHeart();
  }
}

//if (lives == 1) add pulse.
//then remove pulse and add the gone function. HOW?!

function removeHeart() {
  console.log(`#hp_container${lives}`);
  document.querySelector(`#hp_container${lives}`).classList.add("gone");
  document
    .querySelector(`#hp_container${lives}`)
    .addEventListener("animationend", hideHeart);
}

function hideHeart() {
  console.log(`#hp_container${lives}`);
  //stop animation end event
  document
    .querySelector(`#hp_container${lives}`)
    .removeEventListener("animationend", hideHeart);
  //fjern container animationen(nødvendigt?)
  document.querySelector(`#hp_container${lives}`).classList.remove("gone");
  //få spriten til at forsvinde...
  document.querySelector(`#hp_container${lives}`).classList.add("hidden");

  lives--;
  if (lives == 0) {
    gameOver();
  }
}

function gameOver() {
  console.log("The game is lost");

  //deaktiver basis animationerne
  document.querySelector("#sprite_container01").classList.remove("right_left");
  document.querySelector("#sprite_container02").classList.remove("updown");
  document.querySelector("#sprite_container03").classList.remove("left_right");
  document.querySelector("#sprite_container04").classList.remove("wickerman");
  document.querySelector("#sprite_container05").classList.remove("updown");

  //gør sprites u-klikbare
  document
    .querySelector("#sprite_container01")
    .removeEventListener("click", sprite01Clicked);
  document
    .querySelector("#sprite_container02")
    .removeEventListener("click", sprite02Clicked);
  document
    .querySelector("#sprite_container03")
    .removeEventListener("click", sprite03Clicked);
  document
    .querySelector("#sprite_container04")
    .removeEventListener("click", sprite04Clicked);
  document
    .querySelector("#sprite_container05")
    .removeEventListener("click", sprite05Clicked);

  document.querySelector("#game_over").classList.remove("hidden");
}
