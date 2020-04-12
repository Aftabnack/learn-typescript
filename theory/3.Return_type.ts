function add2(n1: number, n2: number): number {
  return n1 + n2;
}

//Doesn't have a return statement. void type.
function print2(n: number): void {
  console.log(n);
}

//Doesn't return anything. undefined type. Can also be void.
function print1(n: number): undefined {
  console.log(n);
  return;
}
