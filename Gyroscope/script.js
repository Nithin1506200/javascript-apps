const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
const lable = document.getElementById("lable");
let swipe = new Audio("swipe.mp3");
let swipeUp = new Audio("swipeUp.mp3");
swipe.play();
const Timer = {
  T: 1000,
  timer: undefined,
  setT(fn) {
    this.timer = 1;
    setTimeout(() => {
      this.timer = undefined;
    }, this.T);
  },
};
if (window.DeviceOrientationEvent) {
  lable.innerText = " SUPPORTED";
  window.addEventListener(
    "devicemotion",
    (e) => {
      if (!Timer.timer) {
        let X, Y, Z;
        X = parseInt(e.acceleration.x);
        Y = parseInt(e.acceleration.y);
        Z = parseInt(e.acceleration.z);

        //[x.innerText, y.innerText, z.innerText] = [X, Y, Z];
        if (Math.abs(X) > 15) {
          x.innerText = X;
          Timer.setT();
          swipe.play();
        }
        if (Math.abs(Y) > 15) {
          y.innerText = Y;
          Timer.setT();
          swipeUp.play();
        }
        if (Math.abs(Z) > 1) {
          z.innerText = Z;
        }
      }
    },
    false
  );
} else {
  lable.innerText = " NOT SUPPORTED";
}
