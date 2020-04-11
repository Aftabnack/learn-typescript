/**
 * Core types:
 * - number (for all numbers including floats)
 * - string
 * - boolean (only true/false. Not truthy/falsy)
 * - object
 * - array
 * - tuple
 * - enum
 * - any (Anything)
 * https://www.typescriptlang.org/docs/handbook/basic-types.html
 */

function add(num1: number, num2: number) {
  return num1 + num2;
}

console.log(add(2, 3));

/**
 * The object type
 */

//This will be inferred as object type with name & age keys
const person = {
  name: "Aftab",
  age: 1,
};
console.log(person.name); //works all fine, including autocomplete

//This will be inferred as object however it will be inferred to have no keys at all and will give error when accessing any property
const person1: object = {
  name: "Aftab",
  age: 1,
};
//console.log(person1.name); //notice the error here

//To correct the above issue, we need to explicitly mention all keys
const person2: { name: string; age: number } = {
  name: "Aftab",
  age: 1,
};
console.log(person2.name); //now it works again

/**
 * Array type
 * - object type accepts array too
 * - Array syntax is diff
 */

function acceptObj(sample: object) {
  console.log(sample);
}
acceptObj(["test"]);

let testAr: string[] = ["test", "this"];
console.log(testAr);

/**
 * Tuple type
 */

let info: [number, string] = [1, "Aftab"];

info.push(213); //This is an exception and can't be caught
//These are caught errors
// info[0] = 'string';
// info[1] = 1;
// info = ['asdasd', 1];

/**
 * enum
 */
//Stars from 0
enum Role {
  ADMIN,
  USER,
  STAFF,
}
const userRole = Role.ADMIN;

//Starts from 5
enum RoleDiffStart {
  ADMIN = 5,
  USER,
  STAFF,
}
const user2Role = RoleDiffStart.ADMIN;

//Diff value for each
enum RoleRandom {
  ADMIN = 5,
  USER = 20,
  STAFF = 30,
}
const user3Role = RoleRandom.ADMIN;
