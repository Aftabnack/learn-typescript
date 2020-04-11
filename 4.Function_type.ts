function add3(n1: number, n2: number) {
  return n1 + n2;
}

let someFn: Function;
someFn = add3;
// someFn = 3; //Throws an error

/**
 * Describe the fn syntax
 */
let someOtherFn: (a: number, b: number) => number;
someOtherFn = add3;

function addAndHandle(n1: number, n2: number, cb: (a: number) => void) {
  cb(n1 + n2);
}

addAndHandle(10, 20, () => {});
