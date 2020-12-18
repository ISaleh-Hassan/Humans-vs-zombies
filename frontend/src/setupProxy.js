const { createProxyMiddleware }  = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/api', 
        { target: 'http://localhost:5000' }
    ));

    // app.listen(3000, () => {
    //     console.log("Server started in port 3000!");
    // });
}