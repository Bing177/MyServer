/* 该文件用于操作数据库mydb */
/* 假设user表结构为:
 *	id int primary key auto_increment,
 *	email varchar(30),
 *	password varchar(15)
 */
const {
	createConnection
} = require('mysql')

const db = createConnection({
	host: 'localhost', //此处为数据库主机名，一般为localhost
	user: 'root', //用户名
	password: '123456', //连接密码
	database: 'mydb', //连接的数据库名
})

//测试
db.query('select 1', (err, res) => {
	if (err) console.log(err);
	console.log('数据库mydb连接成功');
})

// 插入信息到表user中
async function insertUser(email, password) {
	let sql = `insert into user values(null,'${email}','${password}')`
	try {
		let data = await new Promise((resolve, reject) => {
			db.query(sql, (err, res) => {
				if (err) reject(err)
				resolve(res)
			})
		})
		return data
	} catch (e) {
		return e
	}
}

// 获取user中用户信息
async function showUser(id) {
	let sql = `select * from user where id=${id}`
	try {
		let data = await new Promise((resolve, reject) => {
			db.query(sql, (err, res) => {
				if (err) reject(err)
				resolve(res)
			})
		})
		return data
	} catch (e) {
		return e
	}
}

// 统一暴露
module.exports = {
	showUser,
	insertUser
}
