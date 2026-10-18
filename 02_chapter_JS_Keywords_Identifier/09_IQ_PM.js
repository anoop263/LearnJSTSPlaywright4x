// ============================================
// JavaScript Identifier Rules - IQ
// ============================================

let validName = "starts with letter";  //valid
let _private = "starts with underscore";  //valid
let $jquery = "starts with dollar sign"; //valid


let item1 = "letter then digit"; //valid
let _temp2 = "underscore then digit"; //valid
let $var123 = "dollar then digits";   //valid
let a1_b2 = "mixed letters digits underscore"; //valid

// let 1stPlace = "invalid first character should not be a number";
// let 2ndItem = "invalid";

// let Function = "invalid"; //function
// let Function = "invalid"; but it actually works. Function is a built-in name, not a reserved word
let MyVar = "uppercase M";  //valid
let myvar = "lowercase v";  //valid


let café = "Unicode letter é";  //valid
let 变量 = "Chinese characters";  //valid
let \u0041 = "Unicode escape for A";  //valid
let \u005f = "Unicode escape for _";  //valid

// let my-name = "invalid";
// let my name = "invalid";      // SyntaxError: Unexpected identifier
// let my@name = "invalid";      // SyntaxError: Unexpected token '@'
// let my#name = "invalid";      // SyntaxError: Unexpected token '#'
// let my!name = "invalid";      // SyntaxError: Unexpected token '!'


// 1. camelCase (standard for JS variables and functions)
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;

// 2. PascalCase (standard for JS classes and constructors)
let UserProfile = "PascalCase";
let ShoppingCart = "class name style";
function Person() { return "constructor"; }

// 3. snake_case (underscore separated)
let user_name = "snake_case";
let total_price = 49.99;
let is_logged_in = false;

// 4. SCREAMING_SNAKE_CASE (constants)
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";