console.log("Loading...");

var infiniteBackground = {
  el: null,
  style: {
    top: 0,
    left: 0,
    position: "fixed",
    backgroundImage: null,
    backgroundRepeat: "repeat-x",
    backgroundPosition: "0 0",
    backgroundSize: "auto 100%",
    height: "100%",
    width: "100%",
  },
  scrollSideways: function () {
    var scope = this;
    document.addEventListener("scroll", function () {
      var topOffset = $(scope.el).offset().top;
      scope.el.style.backgroundPosition = `-${topOffset}px 0px`;
    });
  },
  init: function (el, bg = "../img/bg.png") {
    this.el = el;
    this.style.backgroundImage = `url("${bg}")`;
    Object.assign(this.el.style, this.style);
    this.scrollSideways();
  },
};

var pipe = {
  //definition of object of the class pipe
  imgSrc: "../img/pipe.png",
  size: null,
  position: {
    top: null,
    left: null,
  },
  style: {
    position: "fixed",
    top: null,
    left: null,
    width: null,
    bottom: 0,
  },
  flip: false,
  init: function (parentEl) {
    var pipeEl = document.createElement("img");
    pipeEl.src = this.imgSrc;
    this.style.left = Math.floor(Math.random() * 1000) + "px";
    this.style.width = Math.floor(Math.random() * 200) + "px";
    Object.assign(pipeEl.style, this.style);
    parentEl.appendChild(pipeEl);
  },
};

$(document).ready(function () {
  infiniteBackground.init(document.getElementById("overlay"));
  var pipe1 = pipe;
  var pipe2 = pipe;
  pipe1.init(document.body);
  pipe2.init(document.body);
});
