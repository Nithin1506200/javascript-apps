import DeviceMotion from "./devicemotion.js";
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
const lable = document.getElementById("lable");

const motionHandler = new DeviceMotion();

//console.log(motionHandler.deviceMotion);
setInterval(handle, 1000);
function handle() {
  x.innerText = JSON.stringify(motionHandler.deviceMotion);
  console.log(motionHandler.deviceMotion);
}
