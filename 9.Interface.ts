interface Greetable {
  readonly name: string;
  greet(): void;
}

//Can extend only one, but implement multiple interfaces
class Greeter implements Greetable {
  constructor(public name: string) {}
  greet() {
    console.log("Hi, I am ", this.name);
  }
}

const a: Greetable = new Greeter("Killer");
// a.name = "test";//Checking with interface will enforce readonly, even if it not in the class

/**
 * Interface is only the blueprint
 * Abstract can be a mixture of implementation & blueprint
 */
/**
 * Extending interfaces
 */
interface Named {
  readonly name: string;
  alias?: string;
}
//Can extend multiple interfaces
interface Greetable2 extends Named {
  greet(): void;
}
class Greeter2 implements Greetable2 {
  constructor(public name: string, public alias?: string) {}
  greet() {
    console.log("Hi, I am ", this.name, " alias ", this.alias);
  }
}

const g1 = new Greeter2("Aftab", "Khan");
console.log(g1.greet());

/**
 * interface as function type
 */
interface addFn {
  (a: number, b: number): number;
}

const myAdder: addFn = (a, b) => a + b;
myAdder(2, 2);
