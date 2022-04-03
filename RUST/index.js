import init from "./rustcode.js";
const pi = await init();
function piJ(a) {
  let ans = 0;
  let d = 1;

  for (let i = 0; i < a; i++) {
    if (i % 2 == 0) {
      ans += 4.0 / d;
    } else {
      ans -= 4.0 / d;
    }
    d += 2.0;
  }
  return ans;
}
const res = 10_000_0000;
console.time("jsTime");
let ans = pi.pi(res);
console.log(ans);
console.timeEnd("jsTime");
console.time("jsTime2");
ans = piJ(res);
console.log(ans);
console.timeEnd("jsTime2");
//   console.time("rustTime");
//   const pii = pi(res);
//   console.log(pii);
//   console.timeEnd("rustTime");
