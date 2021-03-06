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

// const fetchUser = (userType) => {
//     const promise = new Promise((resolve, reject) => {
//         const user = User.findByPk(1);
//         if (user) {
//             resolve(user);
//         } else {
//             user = User.create({
//                 name: 'User1',
//                 email: 'user1@email.com',
//                 userTypeId: userType.id
//             });
//             resolve(user);
//         }

//     });
//     return promise;
// }

// const fetchUser1 = (uType) => {
//     const promise = new Promise((resolve, reject) => {
//             UserType.findOne({
//                     where: {
//                         type: uType
//                     }
//                 })
//                 .then(userType => {
//                     if (!userType) {
//                         return UserType.create({
//                             type: uType
//                         });
//                     } else {
//                         return userType;
//                     }
//                 })
//                 .then(userType => {
//                     const user = () => {
//                         User.findOne({
//                             where: {
//                                 type: userType.id
//                             }
//                         });
//                     }
//                     return Promise.resolve(user);
//                 })
//                 .then(user => {
//                     if (!user) {
//                         return User.create({
//                             name: 'User1',
//                             email: 'user1@email.com',
//                             userTypeId: userType.id
//                         })
//                     }
//                     return user;
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     reject(err);
//                 });
//         }
//         return promise;
//     }