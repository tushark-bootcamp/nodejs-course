const person = {
    name: 'Jan',
    age: 30,
    greet() {
        console.log("Hi, I am " + this.name);
    }
}

//** Object immutability */ 
const copiedPerson = {
    ...person
};
console.log(copiedPerson);

const hobbies = ['soccer', 'collections'];

for (let hobby of hobbies) {
    console.log(hobby);
}

// slice() with no arguments copies the entire array.
const copiedHobbies = hobbies.slice();
console.log(copiedHobbies);

// This only creates nested array instead of copying hobbies[] in coppiedHobbies2[].
const copiedHobbies2 = [hobbies];
console.log(copiedHobbies2);

//** Spread operator; does the same as the slice() method */
const copiedHobbies3 = [...hobbies];
console.log(copiedHobbies3);

//** The Rest operator --> Exactly the opposite of the spread operator */

const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3];
};
console.log(toArray(1, 2, 3));
// this is not flexible as it only works with three arguments. 

//** Rest operator: It takes all the arguments how many we might specify. It bundles it all up in an array for us  */
const toArrayRest = (...args) => {
    return args;
}
console.log(toArrayRest(1, 2, 3, 4));

//** In short: 
//** To pull elements or properties out of the array or object, use spread operator */
//** To merge multiple arguments into an array and use it in the argument list of a function, use rest operator */