const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            console.log(message);
            //** The writeFileSync is a blocking code and hence changed to asynchronous so that the data writing to file operation 
            //** can be done asynchronously and the node server can free itself to receive new requests. */
            //fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {
                setTimeout(() => {
                    if (err) {
                        console.log(err);
                    } else {
                        // res.statusCode = 302;
                        // res.setHeader('Location', '/');
                        console.log('File successfully written!!');
                        // return res.end();
                    }
                }, 5000);

            });
            // Write the below code outside writeFile's callback function if the redirect does NOT depend on the outcome of writing 
            // the message to the message file.
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });

    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page</title></head>');
    res.write('<body><h1>Hello from my node server</h1></body>');
    res.write('</html>');
    res.end();
};

// To export a single element or function use: 
// module.exports = requestHandler;

module.exports = {
    handler: requestHandler,
    someText: 'some hardcoded TextValue'
};

// Alternatively
// module.exports.handler = requestHandler;
// module.exports.someText = 'some hardcoded TextValue';

// Alternatively only for Nodejs --> Not to be used for javascript
// exports.handler = requestHandler;
// exports.someText = 'some hardcoded TextValue';
