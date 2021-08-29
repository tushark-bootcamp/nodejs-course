const fetchData = callback => {
    setTimeout(() => {
        // callback('Done!') returns a string 'Done!';
        callback('Done!');
    }, 1500);
}

//** In the setTimeout() method, the first argument is nothing but a callback function which gets executed after the time specified in the second argument elapses.
setTimeout(() => {
    console.log('Time is done');
    fetchData(messageTxt => {
        console.log(messageTxt);
    });
}, 1);

console.log('Hello!');
console.log('Hi!');

const fetchDataPromise = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // 'resolve('Done!');' is the same as 'callback('Done!');' i.e. returns a string --> Done!
            resolve('Done!');
        }, 1500);
    });
    return promise;
}

setTimeout(() => {
    console.log('Timer is done');
    fetchDataPromise()
        //messageTxt is the 'Done!' string returned by the resolve('Done!') inside the promise (line 23 above)
        .then(messageTxt => {
            console.log(messageTxt);
            return fetchDataPromise();
        })
        .then(messageTxt2 => {
            console.log(messageTxt2);
        });
}, 2000);