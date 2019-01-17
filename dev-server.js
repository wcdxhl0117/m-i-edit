/**
 * Module dependencies.
 */
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
var proxyList = ['http://localhost:8080']
var proxyMid = proxy(proxyList, {
    target: 'https://hw.yooshare.cn',
    changeOrigin: true // for vhosted sites, changes host header to match to target's host
});

var devWebcomProxy = proxy(['/webcom'], {
    target: 'http://127.0.0.1:6555',
})

/**
 * Add the proxy to browser-sync
 */
browserSync.init({
    notify: false,
    port: 6543,
    server: {
        baseDir: './',
        // middleware: [proxyMid, devWebcomProxy]
        middleware: [proxyMid]
    },
    files: [
        {
            match: ["**/*.html", "**/*.js", '!vue/**/*'],
        }
    ]
    // startPath: '/users'
});

console.log('Server: listening on port 6543');
