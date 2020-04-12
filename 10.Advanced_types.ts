/**
 * Intersection type "&"
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
type Admins = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type AdminEmp = Admins & Employee;
//same as below
interface AdminEmp1 extends Admins, Employee {}

const e1: AdminEmp = {
  name: "Aftab",
  privileges: ["create-server"],
  startDate: new Date(),
};

//----------------------------------------------------------------------------
/**
 * Type guards - Code guaranteeing something to be of a give type
 */
type Combinable2 = string | number;

function adderFn(a: Combinable2, b: Combinable2) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  //The below line doesn't throw any error since due to the above
  //condition ensures that it is a number
  return a + b;
}

function printEmpInfo(emp: Admins | Employee) {
  console.log("The name is: ", emp.name);
  //This is another way to do the type guards, when simple typeof check doesn't work
  if ("privileges" in emp) {
    console.log("The name is: ", emp.privileges);
  } else {
    console.log("The name is: ", emp.startDate);
  }
}

//----------------------------------------------------------------------------
/**
 * Another way of doing type guards is to add a common key
 */
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function printAnimalInfo(an: Animal) {
  let speed;
  switch (an.type) {
    case "bird":
      speed = an.flyingSpeed;
      break;
    case "horse":
      speed = an.runningSpeed;
  }
  console.log("Animal is running at ", speed);
}

//----------------------------------------------------------------------------
/**
 * Type casting
 */
const el = document.getElementById("input-elem");
if (el) {
  (el as HTMLInputElement).value = "Hi";
}

//----------------------------------------------------------------------------
/**
 * Index property
 */
type ErrorObj = {
  [key: string]: string;
};
const errors: ErrorObj = {
  name: "Testing",
  any_input: "asdasd",
};

//----------------------------------------------------------------------------
/**
 * Function overloads
 */
function adders(a: number, b: number): number;
function adders(a: string, b: string): string;
function adders(a: Combinable2, b: Combinable2) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  //The below line doesn't throw any error since due to the above
  //condition ensures that it is a number
  return a + b;
}

const res = adders("string", "string");
const res1 = adders(2, 4);
