var express = require('express');
var router = express.Router();
require('../db')
const User = require('../model/users')
const md5 = require('blueimp-md5')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 测试接口
/* router.post('/register', (req, res) => {
  //获取请求参数 req
  const { username, password } = req.body
  //处理 有个默认用户admin
  if(username === 'admin') {
    //注册失败
    res.json({code: 1, msg: '此用户已存在'})
  }else {
    //注册成功
    res.json({code: 0, data: {id: '123', username, password}})
  }
}) */

//注册路由
router.post('/register', async (req, res) => {
  //获取数据
  const { username, password, type } = req.body
  //判断是否有这个用户了
  const result = await User.findOne({username})
  if(result) {
    //用户名重复 不给注册
    res.send({code: 1, msg: '用户名已存在, 请重新注册'})
  }else {
    //注册
    const user = await User.create({username, password: md5(password), type})
    //把数据返给前台
    if(user){
      //密码不返回给前台

      //返回一个cookie
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 7})
      
      res.send({code: 0, data: {username, type, _id: user._id}})
    }else {
      res.send({code: 1, msg: '后台发生错误，联系管理员'})
    }
  }
})

//登录路由
router.post('/login', async (req, res) => {
  //获取前台数据
  const { username, password } = req.body
  //查询是否有该用户
  const result = await User.findOne({username, password: md5(password)},
    {password: 0, __v: 0})

  if(!result) {
    //没有找到
    res.send({code: 1, msg: '找不到该用户，重新登录'})
    return
  }
  //注册cookie
  res.cookie('userid', result._id, {maxAge: 1000 * 60 * 60 * 7})
  res.send({code: 0, data: result})
})

module.exports = router;
