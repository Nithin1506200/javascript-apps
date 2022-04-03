import init, { pi } from "./pi.js";
await init();
const input = document.getElementById("res");
const button = document.getElementById("find");

const output = document.getElementById("output");
const outputR = document.getElementById("outputR");
function calcpi(x) {
  return new Promise((resolve) => {
    let k = 1;
    let s = 0;
    let b = 1;
    for (let i = 0; i < x; i++) {
      s += (b * 4) / k;
      b *= -1;
      k += 2;
    }
    resolve(s);
  });
}

async function calc() {
  let res = input.value;
  let tic = new Date().getTime();
  let ansJ = await calcpi(res);
  let tok = new Date().getTime();

  let timeJavascript = tok - tic;
  tic = new Date().getTime();
  let ansR = await pi(res);
  tok = new Date().getTime();
  let timeRust = tok - tic;
  const javascript = document.getElementById("javascript");
  const rust = document.getElementById("rust");
  javascript.style.width = `${
    (timeJavascript / (timeJavascript + timeRust)) * 50
  }%`;
  rust.style.width = `${(timeRust / (timeJavascript + timeRust)) * 50}%`;

  outputR.innerText = `Rustpi=${ansR} Time: ${timeRust} ms`;
  output.innerText = `Javascript pi=${ansJ} Time: ${timeJavascript} ms`;
}
button.onclick = calc;

// const buttonR = document.getElementById("findR");
// const outputR = document.getElementById("outputR");
// async function calcR() {
//   let res = input.value;
//   let tic = new Date().getTime();
//   let ans = pi(res);
//   let tok = new Date().getTime();

//   let time = tok - tic;
//   outputR.innerText = `pi=${ans} Time: ${time} ms`;
// }
// buttonR.onclick = calcR;
