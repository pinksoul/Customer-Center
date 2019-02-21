module.exports = {
    baseUrl: './',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.0.148:8081',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    }
}


