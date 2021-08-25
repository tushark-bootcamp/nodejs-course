const name = 'Tushar';
let age = 40;
const hasHobbies = true;

const summariseUserNamedFunc = function (userName, userAge, userHasHobbies) {
    return userName + ', ' + userAge + ', ' + userHasHobbies;
}

const summariseUserArrowFunc = (userName, userAge, userHasHobbies) => {
    return userName + ', ' + userAge + ', ' + userHasHobbies;
}

function summariseUser(userName, userAge, userHasHobbies) {
    return userName + ', ' + userAge + ', ' + userHasHobbies;
}

console.log(summariseUserNamedFunc(name, age, hasHobbies));
console.log(summariseUserArrowFunc(name, age, hasHobbies));
console.log(summariseUser(name, age, hasHobbies));

// Different syntax of arrow function

const addFunc = (a, b) => {
    return a + b;
}

// Here we dont use the return statement and the curly braces.
const addFuncSimple = (a, b) => a + b;

// Arrow function with a single argument with paranthesis and curly braces.
const addFuncSingleArgA = (a) => {
    return a + 1
};

// Arrow function with a single argument with paranthesis. 
// If there is only one statement in the arrow function, we can get rid of the curly braces. 
const addFuncSingleArgB = (a) => a + 1;

// For an arrow function with a single argument, you can even remove the paranthesis for the argument
const addFuncSingleArgC = a => a + 1;

// Arrow function without an argument
const addFuncWithoutArgA = () => 2 + 1;

// Arrow function without an argument, with paranthesis and with curly braces (optional for one statement) 
const addFuncWithoutArgB = () => {
    return 2 + 1;
}


console.log(addFunc(1, 2));
console.log(addFuncSimple(1, 2));
console.log(addFuncSingleArgA(2));
console.log(addFuncSingleArgB(2));
console.log(addFuncSingleArgC(2));
console.log(addFuncWithoutArgA());
console.log(addFuncWithoutArgB());