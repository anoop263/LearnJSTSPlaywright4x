// string literal
let name ="anoop";  
let name2 ='anoop';
 

// boolean literal
let isPresent = true;

//numerical literal
let pi=3.14;

// null literal - this is null value
let nullValue=null;

//undefined   - no value at all
let undefinedValue;

// typeof will give the literal which type
console.log(typeof(name2));
console.log(typeof(isPresent));
console.log(typeof(pi));
console.log(typeof(nullValue));
//typeof null value is object

console.log(typeof(undefinedValue));

console.log([1,,3].length);    //3
console.log([1,,3,].length);   //3
console.log([,1,,3].length);   //4 