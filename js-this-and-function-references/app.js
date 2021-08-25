class NameField {
    constructor(name) {
        const field = document.createElement('li');
        field.textContent = name;
        const nameListHook = document.querySelector('#names');
        nameListHook.appendChild(field);
    }
}

class NameGenerator {
    constructor() {
        const btn = document.querySelector('button');
        // The following syntax will NOT work as the javascript will first look for a function addName() inside the scope of the constructor
        // And if it doesn't find it there, it will find it in the global scope which is the app.js or the window to which the app.js file is attached 
        // (outside the class NameGenerator{})
        //** btn.addEventListener('click', addName());

        // The following syntax works as this gives access to the object so we can call methods or properties of that object.
        // But there is still a bug as the this.addName() ends up executing the function when the app.js script runs in index.html when we open it in the browser.
        //** btn.addEventListener('click', this.addName());

        // To simply register the function for the buttonClick event, use the syntax shown as below.
        //** Here we are passing a **reference of the function to the event listener.
        btn.addEventListener('click', this.addName);
    }

    addName() {
        const name = new NameField("Max");
    }
}

// 'const globalNames' is a global variable.  
const globalNames = ['Purva', 'Saanvi', 'Jammie'];

class NamesListGenerator {

    // Unlike Typescript, the keyword **const cannot be used inside the javascript class as below.
    //** const names = ['Purva', 'Saanvi', 'Jammie'];
    // It can only be used inside a constructor or a function.
    constructor() {
        const btn = document.querySelector('button');

        // Since you cannot declare a variable (let) or a constant(const) at class level, 
        // It is declared/initialised inside the constructor like below.
        this.names = ['Laksha', 'Bill', 'Jammie'];
        this.currentName = 0;
        // By declaring it using 'this' keyword, you associate it with the instance of class 
        // which makes it accessible outside the constructor - @See addName() function

        // The following line of code still does not work.
        // For the addName() function to work, it should be able to access the two variables declared 
        // in the constructor namely 'names' and 'currentName'.
        // But since addName is called by the button, 'this' in addName() refers to the button instead of the class 'NamesListGenerator' 
        //** btn.addEventListener('click', this.addName);

        //** For the 'this' inside addName() function to refer to the class NamesListGenerator instead of the button, use the 'bind' keyword as below */
        //btn.addEventListener('click', this.addName.bind(this));

        // An alternate way to call this correctly is using the arrow function like below
        btn.addEventListener('click', () => {
            this.addName();
        });
        // here 'this' always refers to the class regardless of who calls the function.

    }

    addName() {
        console.log(this);
        // Here if while calling addName() does not use the bind, 'this' refers to the button btn who call the addName function on the click of the button
        // And not the class NamesListGenerator
        //** Basically 'this' in a javascript function refers to what's executing the function; and in this instance it is the button */

        // For the addName() to work outside the constructor of NamesListGenerator, it should called with a .bind(this) syntax as shown above.
        const name = new NameField(this.names[this.currentName]);
        if (this.currentName < this.names.length) {
            this.currentName++
        } else {
            this.currentName = 0;
        }
    }
}

const gen = new NamesListGenerator();