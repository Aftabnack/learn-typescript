class Departments {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log("Department :", this.name);
  }
}

const accounts = new Departments("Account");
accounts.describe();

const newCopy = { describe: accounts.describe };
newCopy.describe(); //This will print undefined

//To guard against usage like this. We can explicitly set this
//In the describe method
class Department2 {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department2) {
    console.log("Department :", this.name);
  }
}

const sales = new Department2("Sales");
sales.describe();

const salesCopy = { describe: sales.describe };
//salesCopy.describe(); //This will now throw error
const salesCopy2 = { name: "fix it", describe: sales.describe };
salesCopy2.describe(); //This will work, cuz the object has everything expected from Department2 class

//----------------------------------------------------------------------------
/**
 * Access modifiers
 */
class Insaan {
  name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  printInfo(this: Insaan) {
    console.log(`${this.name} is ${this.age} years old`);
  }
}

const me = new Insaan("Aftab", 26);
me.printInfo();
// me.age; //Can't access since it is private

//----------------------------------------------------------------------------
/**
 * Simple Initialization
 */
class Insaan2 {
  constructor(public name: string, private readonly age: number) {}

  printInfo(this: Insaan2) {
    console.log(`${this.name} is ${this.age} years old`);
  }
}
