/**
 * 3rd party libraries
 */

// By default if you import library which is written in JS
// It doesn't know anything about that package, so it will throw error
import { shuffle } from "lodash";
shuffle([1, 2, 3]);

//To fix it, install the types for that particular package
//yarn add -D @types/lodash
//As soon as you add this, the error above is gone

/**
 * Global objects
 */
//Let's say we have something thrown on window object in index.html
console.log(GLOBAL);

//To fix the above error, we can declare it ourselves to tell TS it exists
declare var GLOBAL: string;

//Similarly let's say we are adding something to window
console.log(window.test);

//correct the above by doing
declare global {
  interface Window {
    test: string;
  }
}

//Let's say we are adding something to array prototype
Array.prototype.joiner = function () {
  return this.join("__");
};
[1, 3, 4].joiner();

//Fix the typings for it
declare global {
  interface Array<T> {
    joiner: () => string;
  }
}

//Similarly if you are adding some functionality to a module
import { Trip2 } from "./12.Decorators";
Trip2.prototype.getSource = function () {
  console.log("Everything comes from nature");
};

//In this case, we need to augment the module definition
declare module "./12.Decorators" {
  interface Trip2 {
    getSource: () => void;
  }
}

/**
 * Writing module definitions
 * https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-function-d-ts.html
 */
