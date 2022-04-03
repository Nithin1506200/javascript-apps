use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn pi(res:u64)->f64{
    let mut ans:f64=0.0;
    let mut k:f64 = 1.0;
    let mut b:f64 = 1.0;
    for i in 0..res {
      ans += (b * 4.0) / k;
      b *= -1.0;
      k += 2.0;
    }
    ans
}