var x;
console.log(x);   //result will be undefined
// this is undefined  

var c =null;
console.log(c);  //result will be null




            // 1. Undefined 
let userName;
console.log(userName);  //undefined
console.log(typeof userName);  //undefined

function greet()
{
    //no return statement
}
console.log(greet());   //undefined no return keyword

let n;
n=10;
console.log(n);

console.log(typeof(n));

           // 2. null

let profilePicture = null;
console.log(profilePicture);    //null
console.log(typeof(profilePicture));

// null==undefined  => true
// null===undefined => false