/**
 * Building up on the basic types we learnt previously.
 * We have the following
 * - Union type
 * - Literal type
 * - unknown type
 * - never type
 */

function combine(
  n1: number | string,
  n2: number | string,
  resultConversion: "num" | "text"
) {
  //return n1 + n2; //This will result in an error
  if (resultConversion === "num") {
    return +n1 + +n2;
  } else {
    return n1.toString() + n2.toString();
  }
}

console.log(combine(2, 3, "num"));
console.log(combine("sample ", "text ", "text"));
//console.log(combine(1,2, 'blah')); //This will error

/**
 * Type alias & Custom types
 */

type Combinable = string | number;
type ResultType = "num" | "text";

function combiner(
  n1: Combinable,
  n2: Combinable,
  resultConversion: ResultType
) {
  //return n1 + n2; //This will result in an error
  if (resultConversion === "num") {
    return +n1 + +n2;
  } else {
    return n1.toString() + n2.toString();
  }
}

type Person = {
  name: string;
  age: number;
};
const user: Person = { age: 26, name: "Aftab" };
const test: Person = { name: "Aftab", age: 25 };

/**
 *  Unknown type
 */

let userInput: unknown;
let userInput2: any;
let userName: string;
userInput = 5;
userInput = "Aftab";
// userName = userInput; //Unknown type can't be assigned
userName = userInput2; //Any type can be assigned
if (typeof userInput === "string") {
  userName = userInput; //Can assign inside type check
}

/**
 * Never type
 */
function thisThrows(): never {
  throw "This block";
}
