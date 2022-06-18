import DeviceMotion from "./devicemotion.js";
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
const lable = document.getElementById("lable");

const motionHandler = new DeviceMotion(alphafn, betafn, gammafn, 500);
setInterval(() => {
  x.innerText = motionHandler.x;
  y.innerText = motionHandler.y;
  z.innerText = motionHandler.z;
}, 500);
//console.log(motionHandler.deviceMotion);
function alphafn() {
  alert("swipe Right/left");
}
function betafn() {
  alert("rotate");
}
function gammafn() {
  alert("drop");
}
