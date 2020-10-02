var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var button = document.getElementById("start-button");
var width = ctx.canvas.width;
var height = ctx.canvas.height;

var mySound;
var swipeSound;
var isGameStarted = false;
var lost = false;

var speedObstacles = 3;
var score = 0;

//   creating a fixed set of obstacles
var obs1 = new Obstacle(300, 40, 0, -40);
var obs2 = new Obstacle(330, 40, 170, -40);
var obs3 = new Obstacle(300, 40, 100, -40);
var obs4 = new Obstacle(250, 40, 0, -40);
var obs5 = new Obstacle(250, 40, 270, -40);
var obs6 = new Obstacle(200, 40, 130, -40);
var obs7 = new Obstacle(350, 40, 250, -40);

var myObstacles = [obs2, obs3, obs4, obs5, obs6, obs7];
var currentObstacles = [obs1];

//Creating the players
var b = new Player(180, 625, 70, 70);
var b2 = new Player(250, 625, 70, 70);

b2.update();
b.update();
if (localStorage.getItem("bestScore")) {
  document.getElementById("highscores").innerHTML =
    "Highscore: " + localStorage.getItem("bestScore");
  document.getElementById("highscores").style.color = "black";
}

button.onclick = function() {
  if (!isGameStarted) {
    myGameArea.start();
    isGameStarted = true;
    button.hidden = true;
  }
};

var myGameArea = {
  start: function() {
    this.interval = setInterval(updateGameArea, 20);
  },

  clear: function() {
    ctx.clearRect(0, 0, width, height);
  },
  score: function() {
    ctx.fillStyle = "#648423";
    ctx.fillRect(0, 0, 500, 30);
    ctx.font = "25px serif";
    ctx.fillStyle = "whitesmoke";
    ctx.fillText("Score: " + score, 210, 22);
  },
  stop: function() {
    clearInterval(this.interval);
  },
};

function updateGameArea() {
  myGameArea.clear();
  mySound.play();

  for (i = 0; i < currentObstacles.length; i++) {
    if (b.crashWith(currentObstacles[i]) || b2.crashWith(currentObstacles[i])) {
      lost = true;
      myGameArea.stop();
      mySound.stop();
      gameReload();
    }

    if (currentObstacles[i].y >= height + 10) {
      score += 1;
      currentObstacles[i].y = -currentObstacles[i].height;
      myObstacles.push(currentObstacles[i]);
      currentObstacles.splice(i, 1);
    }

    currentObstacles[i].y += speedObstacles;
    speedObstacles += 0.0001;

    if (speedObstacles >= 8) {
      speedObstacles = 8;
    }
    currentObstacles[i].update();
  }

  if (currentObstacles[currentObstacles.length - 1].y > 150) {
    elementFallDown();
  }

  b.update();
  b2.update();
  myGameArea.score();
}

function elementFallDown() {
  var index = Math.floor(Math.random() * Math.floor(myObstacles.length));
  currentObstacles.push(myObstacles[index]);
  myObstacles.splice(index, 1);
}

document.onkeydown = function(e) {
  if (!lost) {
    switch (e.keyCode) {
      case 38: //SPLICE
        b.x = 10;
        b2.x = 420;
        break;
      case 40: //CONNECT
        b.x = 180;
        b2.x = 250;
        break;
      case 37: //SHIFT LEFT
        b.x = 10;
        b2.x = 80;
        break;
      case 39: //SHIFT RIGHT
        b.x = 350;
        b2.x = 420;
        break;
    }
    swipeSound.play();
    myGameArea.clear();
    updateGameArea();
    b.update();
    b2.update();
  }
};

function gameReload() {
  isGameStarted = false;
  lost = true;
  button.hidden = false;
  button.innerHTML = "TRY AGAIN?";
  button.style.backgroundColor = "yellow;";
  button.style.color = "white";

  document.getElementById("score").innerHTML = "Your Score is: " + score;
  document.getElementById("score").style.color = "black";
  // document.getElementById("score").style.fontSize = "40px";

  if (
    localStorage.getItem("bestScore") === undefined ||
    localStorage.getItem("bestScore") < this.score
  ) {
    localStorage.setItem("bestScore", this.score);
  }

  if (localStorage.getItem("bestScore")) {
    document.getElementById("highscores").innerHTML =
      "Highscore: " + localStorage.getItem("bestScore");
    document.getElementById("highscores").style.color = "black";
  }

  button.onclick = function() {
    window.location.reload();
  };
}
