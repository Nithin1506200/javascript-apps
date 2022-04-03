const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let canvasData;
let grid = [];
let next = [];
let kernel = 10;
let Da = 1,
  Db = 0.05,
  feed = 0.055,
  k = 0.062;
const [width, height] = [300, 300];

function setup() {
  return new Promise(async (resolve, err) => {
    createCanvas(width, height);
    canvasData = ctx.getImageData(0, 0, width, height);
    grid = [];
    for (let x = 0; x < width; x++) {
      grid[x] = [];
      next[x] = [];
      for (let y = 0; y < height; y++) {
        grid[x][y] = { a: 1, b: 0 };
        next[x][y] = { a: 1, b: 0 };
      }
    }
    for (
      let x = Math.floor(width / 2) - kernel / 2;
      x < Math.floor(width / 2) + kernel / 2;
      x++
    ) {
      for (
        let y = Math.floor(height / 2) - kernel / 2;
        y < Math.floor(height / 2) + kernel / 2;
        y++
      ) {
        grid[x][y].b = 1;
      }
    }
    for (let x = 0; x < width; x++) {
      grid[x][0].a = 0;
      grid[x][height - 1].a = 0;
    }
    for (let x = 0; x < width; x++) {
      grid[0][x].a = 0;
      grid[width - 1][x].a = 0;
      //console.log("this");
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        drawPixel(x, y, grid[x][y].a, 0, grid[x][y].b, 255);
      }
    }
    await updateCanvas();
    resolve("success");
  });

  //updateCanvas();

  // setInterval(draw, 1000);
}

function draw() {
  //updateCanvas();
  return new Promise((resolve) => {
    for (let x = 1; x < width - 1; x++) {
      for (let y = 1; y < height - 1; y++) {
        let a = grid[x][y].a;
        let b = grid[x][y].b;
        next[x][y].a = a + Da * laplaceA(x, y) - a * b * b + feed * (1 - a);
        next[x][y].b = b + Db * laplaceB(x, y) + a * b * b - (k + feed) * b;
        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        drawPixel(x, y, next[x][y].a, 0, next[x][y].b, 255);
      }
    }
    resolve();
  });

  // console.log(canvasData.data);
}

function swap() {
  return new Promise((resolve) => {
    [grid, next] = [next, grid];
    resolve();
  });
}

function drawPixel(x, y, r, g, b, a) {
  const index = (x + y * width) * 4;
  let c = Math.floor((r - b) * 255);

  let c2 = Math.floor((r / (r + b)) * 255);
  let c3 = Math.floor((b / (r + b)) * 255);
  c3 = constrain(c3, 0, 255);
  c2 = constrain(c2, 0, 255);
  c = constrain(c, 0, 255);
  canvasData.data[index + 0] = c;

  //console.log(r, b, g);
  canvasData.data[index + 1] = c;
  canvasData.data[index + 2] = c;
  canvasData.data[index + 3] = 255;
}
function updateCanvas() {
  return new Promise((resolve) => {
    ctx.putImageData(canvasData, 0, 0);
    resolve();
  });
}
function createCanvas(w, h) {
  canvas.height = h;
  canvas.width = w;
}

function laplaceA(x, y) {
  let sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}
function laplaceB(x, y) {
  let sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

//window.requestAnimationFrame(draw);
//setInterval(draw, 1000);
function constrain(x, low, high) {
  if (x < low) {
    return low;
  } else if (x > high) {
    return high;
  } else return x;
}
async function main() {
  await setup();

  await updateCanvas();

  setInterval(async () => {
    await draw();

    await updateCanvas();
    await swap();
  }, 5);
}
main();
