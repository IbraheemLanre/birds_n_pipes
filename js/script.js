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
  init: function (el, bg) {
    this.el = el;
    this.style.backgroundImage = bg ? `url("${bg}")` : 'url("../img/bg.png")';
    Object.assign(this.el.style, this.style);
    this.scrollSideways();
  },
};

$(document).ready(function () {
  infiniteBackground.init(
    document.getElementById("overlay"),
    "https://previews.123rf.com/images/davidoff205020/davidoff2050201807/davidoff205020180700014/103899414-minimalist-abstract-background-seamless-loop-infinite-space-background-matrix-of-glowing-stars-with-.jpg"
  );
});
