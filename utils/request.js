/*
 * @Author: Rare lu
 * @Date: 2024-11-28 16:08:35
 * @LastEditTime: 2024-11-28 16:09:41
 * @LastEditors: Rare lu
 * @Description: 
 * @FilePath: /wechat-app-utils/utils/request.js
 */


// 创建WxRequest类
// 通过类的方式来进行封装，会让代码更加具有复用性
// 也可以方便添加新的属性和方法
class WxRequest {

	// 定义实例属性，用来设置默认请求参数
	defaults = {
	  // 请求基地址
	  baseURL: '',
	  // 请求路径
	  url: '',
	  // 请求参数
	  data: null,
	  // 默认的请求方法
	  method: 'GET',
	  // 请求头
	  header: {
		// 设置数据的交互格式
		'Content-type': 'application/json'
	  },
	  // 默认的超时时长，小程序默认的超时时长是1分钟
	  timeout: 60000,
	  // 控制是否适用默认的loading,默认值是true 表示使用默认的loading
	  isLoading: true
	}
  
	// 定义拦截器对象
	// 需要包含请求拦截器以及响应拦截器，方便在请求之前以及相应之后进行逻辑处理
	interceptors = {
	  // 请求拦截器
	  // 在请求发送之前，对请求参数进行新增或者修改
	  request: (config) => config,
  
	  // 响应拦截器
	  // 在服务器响应数据以后，对服务器响应的数据进行逻辑处理
	  response: (response) => response
	}
  
	// 定义数组队列
	// 初始值需要是一个空数组,用来存储请求队列\存储请求标识
	queue = []
  
  
	// 用于创建和初始化类的属性和方法
	// 在实例化时传入的参数，会被constructor形参进行接收
	constructor(params = {}) {
	  // 从右往左 params覆盖this.defaults，再将this.defaults和{}进行合并
	  // 通过Object.assign方法合并请求参数 注意：需要传入的参数，覆盖默认的参数，因此传入的参数需要放到最后
	  this.defaults = Object.assign({}, this.defaults, params)
	}
	// request 实例方法接收一个对象类型的参数
	// 属性值和wx.request方法调用时传递的参数保持一致
	request(options) {
	  // 如果有新的请求,就清除上一次的定时器
	  this.timeId && clearTimeout(this.timeId)
  
	  // 注意：需要先合并完成的请求地址 baseURL+url
	  options.url = this.defaults.baseURL + options.url
  
	  // 合并请求参数
	  options = { ...this.defaults, ...options }
  
	  // 在请求发送之前,添加loading效果
	  // wx.showLoading()
  
	  if (options.isLoading) {
		// 判断queue队列是否为空,如果是空,就显示loading
		// 如果不是空,就不显示loading,不调用wx.showLoading()
		this.queue.length === 0 && wx.showLoading()
		// 然后立即向queue数组队列中添加请求标识
		// 每个标识代表是一个请求,标识是自定义的
		this.queue.push('request')
	  }
  
	  // console.log(options)
  
	  // 在请求发送之前，调用请求拦截器，新增和修改请求参数
	  options = this.interceptors.request(options)
  
	  // 需要使用Promise封装wx.request处理异步请求
	  return new Promise((resolve, reject) => {
		wx.request({
		  // ...options 是 ES6 的扩展运算符，它将 options 对象的所有属性展开并传递给 wx.request
		  ...options,
		  // 当接口调用成功时会触发success回调函数, 使用 resolve 返回成功的结果
		  success: (res) => {
			const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
			resolve(this.interceptors.response(mergeRes))
		  },
		  // 当接口调用失败时会触发fail回调函数, 使用 reject 返回错误信息。
		  fail: (err) => {
			const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
			resolve(this.interceptors.response(mergeErr))
			reject(err)
		  },
		  // 接口调用结束的回调函数(调用成功 失败都会执行)
		  complete: () => {
			if (options.isLoading) {
			  // 不管请求是成功还是失败,都需要隐藏loading
			  // wx.hideLoading()
  
			  // 在每一个请求结束以后,都会执行complete回调函数
			  // 每次从queue队列中删除一个标识
			  this.queue.pop()
  
			  this.queue.length === 0 && this.queue.push('request')
			  this.timeId = setTimeout(() => {
				this.queue.pop()
				// 在删除标识之后,需要判断目前queue数组是否为空
				// 如果是空,说明并发请求完成了
				// 就需要隐藏loading,要调用wx.hideLoading()
				this.queue.length === 0 && wx.hideLoading()
				clearTimeout(this.timeId)
			  }, 1);
			}
		  }
		})
	  })
	}
  
	/* 
		封装GET实例方法
	*/
	get(url, data = {}, config = {}) {
	  // 需要调用request请求方法发送请求，只需要组织好参数，传递给request请求方法即可
	  //  当调用get方法时，需要将request方法的返回值return出去
	  return this.request(Object.assign({ url, data, method: 'GET' }, config))
	}
  
	/* 
		封装POST实例方法
	*/
	post(url, data = {}, config = {}) {
	  return this.request(Object.assign({ url, data, method: 'POST' }, config))
	}
  
	/* 
		封装DELETE实例方法
	*/
	delete(url, data = {}, config = {}) {
	  return this.request(Object.assign({ url, data, method: 'DELETE' }, config))
	}
  
	/* 
	  封装PUT实例方法
	*/
	put(url, data = {}, config = {}) {
	  return this.request(Object.assign({ url, data, method: 'PUT' }, config))
	}
  
	/* 
	  封装all方法用来处理并发请求
	*/
	all(...promise) {
	  console.log(promise)
	  //  通过展开运算符接受传递的参数
	  // 那么展开运算符会将传入的参数转成数组
	  return Promise.all(promise)
	}
  }
  
  export default WxRequest
  
