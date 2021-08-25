const person = {
    name: 'Jan',
    age: 30,
    greet() {
        console.log("Hi, I am " + this.name);
    }
}

const printNameAgeGreet = (personData) => {
    console.log(personData.name);
    console.log(personData.age);
    //console.log(personData.greet());
    console.log('Completed!!');
};

printNameAgeGreet(person);

//** Using object destructuring */

const printNameAgeGreetDestruct = ({name, age, greet}) => {
    console.log(name);
    console.log(age);
    //console.log(greet());
};

printNameAgeGreetDestruct(person);

const {name, age} = person;
console.log(name, age);

//** Destructuring arrays */
const hobbies = ['soccer', 'cooking'];
[hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);