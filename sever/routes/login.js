var express = require('express');
var router = express.Router();

const connection = require('./js/conn');
//引入jsonwebtoken
const jwt = require('jsonwebtoken')

/* 写一个路由 统一设置响应头 */ 
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token

	// 放行
	next();
})

/* --------------------  验证token合法性开始  ---------------- */ 
//准备一个签名
const secretKey = 'itsource';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');
//验证token的合法性
router.use(expressJwt({
    secret: secretKey
}).unless({
    path: ['/login/checklogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）

}));
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})
/* --------------------  验证token合法性结束  ---------------- */ 


/* 检查用户名和密码是否正确 */
router.post('/checklogin',(req,res)=>{
    let {account,password}=req.body;
    const sqlStr=`select * from account where account = '${account}' and password='${password}'`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        
        if(data.length){
            //生成token 把token和数据一起响应给前端
 			const token = jwt.sign(Object.assign({}, data[0]), secretKey, { expiresIn:  60*60*2 } )
            res.send({code:0,reason:'欢迎您登录成！',token})
        }else{
            res.send({code:1,reason:'登录失败，注意你的用户名和密码！'})
        }
    })
})
/* 获取当前登录用户名 */ 
router.get('/currentaccount', (req, res) => {
	// 响应当前登录的账号名给前端 （使用express-jwt验证token合法后 会把token的值 存入 req.user 其实就是当前登录账号数据对象）
	res.send(req.user.account)
})



module.exports = router;