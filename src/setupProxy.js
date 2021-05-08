const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/mal',
        createProxyMiddleware({
            target: 'https://myanimelist.net/v1/oauth2',
            changeOrigin: true,
            pathRewrite: {
                "^/mal": "/"
            }
        })
    );
};