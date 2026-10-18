let amul = null;
let value = amul ?? "Nandini Milk";
console.log(value);  //Nandini Milk



let api_response = null;
let responsedata = api_response ?? "{}";
console.log(responsedata);  //{}

let api_response1 = "Anoop";
let responsedata1 = api_response1 ?? "{}";
console.log(responsedata1);  //Anoop


//Nullish coalescing operator (??) is a logical operator that returns 
// its right-hand side operand when its left-hand side operand is 
// null or undefined, and otherwise returns its left-hand side operand.