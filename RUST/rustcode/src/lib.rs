use wasm_bindgen::prelude::*;
#[wasm_bindgen]
pub fn pi(a: u64)-> f64 {
    let mut pi:f64=0.0;
    let mut d:f64=1.0;

    for i in 0..a{
        if i%2==0 {
            pi+=4.0/d;
        }
        else {
            pi-=4.0/d
        }
        d+=2.0
    }
    pi
}
