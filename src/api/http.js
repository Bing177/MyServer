const axios = require('axios')
const qs = require('querystringify')

//默认配置
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(config => {
	// 添加Token认证，可从本地存储或vuex获取。以localStorage为例
	const token = localStorage.getItem('token')
	token && (config.headers.Authorization = token) //token存在且未过期
	return config
}, error => {
	return Promise.reject(error)
})
//响应拦截器
axios.interceptors.response.use(response => response, error => {
	if (error.response) { //请求成功，且响应数据，但状态码非2xx
		switch (error.response.status) { //此处可对状态码做相应操作，如
			case 401:
				console.log('未登录')
				break;
			case 403:
				console.log('Token过期')
				break;
			case 404:
				console.log('页面不存在')
				break;
			default:
				break;
		}
	} else { // 请求失败
		console.log(error.message);
	}
	console.log(error.config);
})

module.exports = {
	axios
}
