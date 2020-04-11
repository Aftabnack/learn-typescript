type Roles = "police" | "theif";
type RolesWithDefault = Roles | "unassigned";

class Person {
  static bioName = "Homo Sapiens";
  protected role: RolesWithDefault = "unassigned";
  constructor(protected name: string, private readonly age: number) {}

  protected getInfo() {
    console.log("The name is : ", this.name);
    console.log("The age is: ", this.age);
    console.log("The role is: ", this.role);
  }
}

class Police extends Person {
  constructor(name: string, age: number, private station: string) {
    super(name, age);
    this.role = "police";
  }

  get _name() {
    return this.name;
  }

  getStation() {
    this.getInfo();
    console.log("The station is: ", this.station);
  }
}

const p1 = new Police("Police", 24, "DBPur");
console.log(p1.getStation());
console.log(p1._name);
console.log(Person.bioName); //Static property
