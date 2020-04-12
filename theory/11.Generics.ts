/**
 * https://www.typescriptlang.org/docs/handbook/generics.html
 */

const promise: Promise<number> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(110);
  }, 200);
});

promise.then((data) => {
  //Type script is able to suggest this, since we
  //have mentioned that promise will return a number
  data.toFixed();
});

//----------------------------------------------------------------------------
/**
 * Building our own generic
 */
function merge<T, U>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

const res2 = merge({ age: 20 }, { name: "Aftab" });
res2.name;
res2.age;

function merger<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

merger({ a: 2 }, { n: 2 });
// merger(2, 3); // This will fail

function lengthCheck<T extends { length: number }>(el: T): string {
  return `The length is ${el.length}`;
}

lengthCheck("sdasdas");
lengthCheck([1, 2, 4]);
// lengthCheck(1); //Doesn't have length key

//----------------------------------------------------------------------------
/**
 * Keyof
 */
function ObjectAccess<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

//----------------------------------------------------------------------------
/**
 * Generic classes
 */

class DataStore<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    const idx = this.data.indexOf(item);
    if (idx !== -1) {
      this.data.splice(idx, 1);
    }
  }

  getData() {
    return [...this.data];
  }
}

const textStore = new DataStore<string>();
textStore.addItem("test");
textStore.addItem("blah");
textStore.removeItem("test");
textStore.getData();

//----------------------------------------------------------------------------
/**
 * Generic utilities - Partial, Readonly
 */
type FinalRes = {
  status: number;
  data: object;
};
function buildResult(rawData: { bool: boolean; data: object }): FinalRes {
  const res: Partial<FinalRes> = {};
  const { bool, data } = rawData;
  res.status = bool === true ? 200 : 500;
  res.data = data;
  return res as FinalRes;
}

const inputs: Readonly<{ id: number; name: string }[]> = [
  { id: 1, name: "Khan" },
  { id: 2, name: "Aftab" },
];
// inputs.push("asdasd"); //This will get captured
