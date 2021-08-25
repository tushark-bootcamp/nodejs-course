//** In the setTimeout() method, the first argument is nothing but a callback function which gets executed after the time specified in the second argument elapses.
setTimeout(() => {
    console.log('Time is done after 3 seconds');
    fetchData(messageTxt => {
        console.log(messageTxt);
    });
}, 3000);

// The callback in "= callback =>" is the callback function name passed as the argument to the function
const fetchData = callback => {
    console.log('Calling fetchData');
    setTimeout(() => {
        // callback('Done!') returns a string 'Done!';
        callback('Done calling fetchData!');
    }, 5000);
}

// This fuction is just to try something; here the callbacks does not work because it is not passed as the argument.
const fetchDatar = (() => {
    console.log('Calling fetchDatar');
    setTimeout(() => {
        // callback('Done!') returns a string 'Done!';
        callbacks('Done calling fetchDatar!');
    }, 5000);
});

// This fuction too is just to try something
const fetchDatarr = (() => {
    console.log('Calling fetchDatarr');
    setTimeout(() => {
        console.log('Done calling fetchDatarr!');
    }, 5000);
});