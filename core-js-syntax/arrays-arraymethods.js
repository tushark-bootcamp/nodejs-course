const hobbies = ['soccer', 'collections'];

for(let hobby of hobbies) {
    console.log(hobby);
}

// Inside map method we have used arrow function with a single argument -- hobby.
console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
console.log(hobbies);

hobbies.push('Coding');
console.log(hobbies);
// you can see, 'Coding' being added to hobbies[] without an error
// Here the pointer hobbies is still pointing to the same object address in the memory, therefore our constant value has NOT changed.
// We are only editing the constant value i.e. the thing that the constant thing is pointing at!!