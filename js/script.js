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
      left: Math.floor(Math.random() * 2000) + "px",
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

  moveLeft(distance) {
    let _current = parseInt(this.style.left);
    document.getElementById(this.id).style.left = `${
      _current - distance / this.movementRatio
    }px`;
  }
}

$(document).ready(function () {
  // instance of the class Background, "this" variable inside an instance refers to the instance itself
  // not to the class
  var bg = new Background(document.getElementById("background"));

  document.addEventListener("scroll", function () {
    var offset = window.scrollY;

    bg.scrollSideWay(offset);
    pipe1.moveLeft(offset);
    pipe2.moveLeft(offset);
    pipe3.moveLeft(offset);
    pipe4.moveLeft(offset);
    pipe5.moveLeft(offset);
  });
  var pipe1 = new Pipe(document.body);
  var pipe2 = new Pipe(document.body);
  var pipe3 = new Pipe(document.body);
  var pipe4 = new Pipe(document.body);
  var pipe5 = new Pipe(document.body);
});
