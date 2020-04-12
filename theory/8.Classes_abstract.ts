//Describe that department class should have certain method/property
//This method can now only be extended not instantiated
abstract class Department {
  abstract role: string;
  constructor(protected name: string) {}
  abstract getInfo(): void;
}

class Admin extends Department {
  role = "Admin";
  getInfo() {
    console.log("Admin dept: ", this.name);
  }
}

//Singleton using private constructors
class Leadership extends Department {
  role = "L team";
  private constructor(name: string) {
    super(name);
  }
  private static instance: Leadership;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Leadership("Aftab");
    }
    return this.instance;
  }
  getInfo() {
    console.log("Leadership: ", this.name);
  }
}

const l1 = Leadership.getInstance();
const l2 = Leadership.getInstance();
console.log(l1, l2, l1 === l2);
