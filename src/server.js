/* 该文件用于创建服务器 */
const express = require('express')
const session = require('express-session')
const {
	expressjwt: expressJWT
} = require('express-jwt')
const router = require('./router')
const app = express()

// 定义密钥
const secret = '~@bing^-^wuhu@~'

// 使用自定义全局中间件，解决跨域
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Methods', '8')
	res.header('Access-Control-Allow-headers',
		'Content-Type,Content-Length,Authorization,Accept,X-Request-With')
	res.header('Access-Control-Allow-Credentials', 'true')
	next()
})

// 全局配置解析表单数据格式中间件,可配合封装后的axios使用(/src/api/my-http)
app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))

// 全局配置session中间件(优先使用JWT认证)
// app.use(session({
// 	secret,
// 	resave:false,
// 	saveUninitialized:true,
// 	cookie:{
// 		maxAge:1000*60*3 // 设置cookie过期时间
// 	}
// }))

// 全局配置expressJWT中间件，用于将加密的Token还原,可配合封装后的axios使用(/src/api/my-http)
app.use(expressJWT({
	secret,
	algorithms: ['HS256']
}).unless({
	path: /^\/my\/api\//
})) // 以/my/api/开头的接口无需Token认证

// 使用路由
app.use('/my', router)

//使用全局自定义错误中间件
app.use((err, req, res, next) => {
	res.send(err.message)
	next()
})

app.listen(5000, err => {
	if (err) return err
	console.log('http://localhost:5000');
})
// 暴露密钥字符串
module.exports.secret = secret
