var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {
	target: 'http://localhost:8080',
	changeOrigin: true
});

module.exports = {
	server: {
		middleware: {
			1: apiProxy
		}
	}
};