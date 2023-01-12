/* 该文件用于提供路由接口 */
const express = require('express')
const jwt = require('jsonwebtoken')
const secretkey = require('./server')
const {
	insertUser,
	showUser
} = require('./mydb-sql')
const router = express.Router()

/* 我这里举两个例子：一个是注册的接口；一个是查看用户注册的信息接口 */
router.post('/api/register', (req, res) => {
	// 通过axios请求，以data请求体传递的参数:email,password
	const {
		email,
		password
	} = req.body
	// 注册成功后，将信息添加到mydb数据库中的user表
	insertUser(email, password) // 该方法作用：将传递来的参数插入到数据表中
	// 设置token字符串，对用户邮箱进行加密，过期时间为7天
	let token = jwt.sign({
		email
	}, secretkey.secret, {
		expiresIn: '7d'
	})
	res.send({
		status: 200,
		msg: '注册成功',
		token: 'Bearer ' + token
	})
})

router.get('/get/user', (req, res) => {
	res.send({
		status: 200,
		msg: '已登录',
		info: req.auth
	})
})

module.exports = router
