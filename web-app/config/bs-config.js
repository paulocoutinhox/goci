module.exports = {
	port: 9000,
	server: {
		baseDir: "dist",
		middleware: {
			1: require('http-proxy-middleware')('/api', {
				target: 'http://localhost:8080',
				changeOrigin: true
			}),
			2: require('connect-history-api-fallback')({
				index: '/index.html',
				verbose: true
			})
		}
	}
};