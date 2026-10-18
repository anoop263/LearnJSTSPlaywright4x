// multiple condition
// age=26
// age> 20-> go goa, age >25->Drink

let age = 26;

let is_anoop_enjoy = (age > 20) ? "Enjoy Goa" : "Stay Home";
console.log(`Anoop can ${is_anoop_enjoy}`);   // Anoop can Enjoy Goa

let is_anoop_enjoy1 = (age > 20) ? (age > 25 ? "Enjoy Goa and Drink" : "Just Enjoy Goa No Drink") : "Stay Home";
console.log(`Anoop can ${is_anoop_enjoy1}`);   // Anoop can Just Enjoy Goa No Drink
