const person = {
    name: 'Jan',
    age: 30,
    // greet: () => {
    //     console.log("Hi, I am " + this.name);
    // }
    greet() {
        console.log("Hi, I am " + this.name);
    }
}

console.log(person);
person.greet();