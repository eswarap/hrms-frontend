const { defineConfig } = require('@vue/cli-service')

module.exports = {
    transpileDependencies: [],
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true
            }
        }
    }
}


