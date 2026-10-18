console.log(""==0);  //true  coerced to number 0
console.log("0"==0); //true
console.log(""=="0");  //false both are strings, compared as it is

console.log();

console.log(""===0);  //false
console.log("0"===0); //false
console.log(""==="0");  //false
// coerced concept