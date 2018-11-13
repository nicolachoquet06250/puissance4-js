const carlo = require('carlo');
const $ = require('jquery');

let main = () => {
    // Launch the browser.
    const app = carlo.launch();

    // Terminate Node.js process on app window closing.
    app.on('exit', () => process.exit());

    // Tell carlo where your web files are located.
    app.serveFolder(`${__dirname}/..`);

    // Expose 'env' function in the web environment.
    app.exposeFunction('env', _ => process.env);

    // Navigate to the main page of your app.
    app.load('index.html');
};

main();