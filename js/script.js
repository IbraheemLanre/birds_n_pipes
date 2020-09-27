console.log("Loading...");

class Background {
  constructor(el, bgImg = "../img/bg.png") {
    this.el = el;
    this.style = {
      left: 0,
      top: 0,
      position: "fixed",
      height: "100%",
      width: "100%",
      backgroundRepeat: "repeat-x",
      backgroundPosition: "0 0",
      backgroundSize: "auto 100%",
      backgroundImage: `url("${bgImg}")`,
    };
    this.movementRatio = 50;
    Object.assign(this.el.style, this.style);
  }

  scrollSideWay(distance) {
    this.el.style.backgroundPosition = `-${
      distance / this.movementRatio
    }px 0px`;
  }
}

class Pipe {
  constructor(parentEl) {
    this.id = "pipe_" + Math.floor(Math.random() * 2000);
    this.imgSrc = "../img/pipe.png";
    this.size = null;
    this.style = {
      position: "fixed",
      top: null,
      left: Math.floor(Math.random() * 10000) + "px",
      width: Math.floor(Math.random() * 200) + "px",
      bottom: 0,
    };
    this.flip = false;
    this.movementRatio = 20;

    var pipeEl = document.createElement("img");
    pipeEl.src = this.imgSrc;
    pipeEl.id = this.id;
    Object.assign(pipeEl.style, this.style);

    parentEl.appendChild(pipeEl);
  }

  /**
   * Calculate the actual distance that the pipe needs to be shifted to the left of the screen
   * according to the distance parameter and the movement ratio
   * @param {Number} distance
   */

  moveLeft(distance) {
    let _current = parseInt(this.style.left);
    document.getElementById(this.id).style.left = `${
      _current - distance / this.movementRatio
    }px`;
  }
}

class Bird {
  constructor(parentEl) {
    this.id = "bird_" + Math.floor(Math.random() * 2000);
    this.imgSrc = "../img/bird.png";
    this.jumping = false;
    this.style = {
      position: "fixed",
      top: Math.floor(Math.random() * 80) + "%",
      left: Math.floor(Math.random() * 2000) + "px",
      width: Math.floor(Math.random() * 200) + "px",
    };
    this.movementRatio = 20;

    var birdEl = document.createElement("img");
    birdEl.src = this.imgSrc;
    birdEl.id = this.id;
    Object.assign(birdEl.style, this.style);

    parentEl.appendChild(birdEl);
    this.addGravity();
    var scope = this;

    document.addEventListener("click", function () {
      scope.jump();
    });
  }

  moveLeft(distance) {
    let _current = parseInt(this.style.left);
    document.getElementById(this.id).style.left = `${
      _current + distance / this.movementRatio
    }px`;
  }

  addGravity() {
    var scope = this;
    var gravity = setInterval(function () {
      if (scope.jumping) {
        return;
      }

      var _current = parseInt(scope.style.top);
      if (_current == 100) {
        var fallenBird = new CustomEvent("FALLEN_BIRD", { detail: scope.id });
        console.log(`Dispatching a FALLEN Event from the bird ${scope.id}`);
        document.dispatchEvent(fallenBird);
      }
      var _new = _current < 100 ? _current + 1 : _current;
      scope.style.top = _new;
      document.getElementById(scope.id).style.top = `${_current}%`;
    }, 1000 / 35);

    document.addEventListener("FALLEN_BIRD", function (e) {
      if (e.detail == scope.id) {
        clearInterval(gravity);
      }
    });
  }

  jump() {
    var scope = this;
    var counter = 0;

    this.jumping = true;

    setInterval(function () {
      if (counter === 15) {
        scope.jumping = false;
        return;
      }
      this.jumping = true;
      var _current = parseInt(scope.style.top);
      counter++;
      var _new = _current > 1 ? _current - 1 : _current;
      scope.style.top = _new;
      document.getElementById(scope.id).style.top = `${_current}%`;
    }, 1000 / 75);
  }
}

$(document).ready(function () {
  // instance of the class Background, "this" variable inside an instance refers to the instance itself
  // not to the class
  var bg = new Background(document.getElementById("background"));

  var pipes = new Array(20);
  for (var i = 0; i < pipes.length; i++) {
    pipes[i] = new Pipe(document.body);
  }

  // var birds = new Array(10);
  // for (var i = 0; i < birds.length; i++) {
  //   birds[i] = new Bird(document.body);
  // }

  var bird1 = new Bird(document.body);

  var offset = 0;
  var autoScroll = setInterval(function () {
    offset += 200;
    bg.scrollSideWay(offset);

    pipes.forEach(function (pipe) {
      pipe.moveLeft(offset);
    });
  }, 50);

  document.addEventListener("FALLEN_BIRD", function () {
    console.log("Detected a fallen bird");
    clearInterval(autoScroll);
  });
});
