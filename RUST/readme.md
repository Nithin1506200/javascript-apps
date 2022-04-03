cargo new -–lib filename

cd filename

Cargo.toml

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.78"
//
use wasm_bindgen::prelude::\*; #[wasm_bindgen]
pub fn sub(a: i32)-> i32 {
a
}

wasm-pack build –target web
