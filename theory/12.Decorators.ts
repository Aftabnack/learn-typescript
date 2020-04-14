/**
 * Decorators
 * https://www.typescriptlang.org/docs/handbook/decorators.html
 */

function Logger(ctor: Function) {
  console.log("Initilizing class " + ctor.name);
}

function LoggerFactory(opts: object) {
  return function (ctor: Function) {
    console.log("Initilizing class " + ctor.name);
    console.log("Options " + opts);
  };
}
/**
 * - Decorators execute bottom up
 * - And initialize top down
 * - Can have decorator on Class, Property, Setter/Getters, Methods, Method params
 */

@LoggerFactory({ tes: true })
@Logger
class Trip {
  constructor(private dest: string) {}
  getDest() {
    return this.dest;
  }
}

//--------------------------------------------------------------------------
/**
 * Decorator which adds functionality to class
 */
function logDest() {
  return function <T extends { new (...args: any[]): { dest: string } }>(
    ctor: T
  ) {
    return class extends ctor {
      constructor(..._: any[]) {
        super(..._);
        console.log("The destination here is: ", this.dest);
      }
    };
  };
}

function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const origMethod = descriptor.value;
  return {
    enumerable: false,
    configurable: true,
    get() {
      //This is going to ensure proper this is bound
      return origMethod.bind(this);
    },
  };
}

@logDest()
export class Trip2 {
  //   constructor(private dest: string) {} //This won't work since it is not publicly accessible
  constructor(public dest: string) {}
  getDest() {
    return this.dest;
  }
}

//----------------------------------------------------------------------------
type ValidationsData = {
  [className: string]: {
    [propName: string]: string[];
  };
};
const validations: ValidationsData = {};

function RegisterValidators(types: string[]) {
  return function (target: any, propName: string) {
    validations[target.constructor.name] = {
      [propName]: types,
    };
  };
}

function doValidate() {
  //Use the validations to figure out what validations to run
}

class Product {
  @RegisterValidators(["required"])
  name: string;
  @RegisterValidators(["required", "positive"])
  price: number;
  constructor(n: string, p: number) {
    this.name = n;
    this.price = p;
  }
}
