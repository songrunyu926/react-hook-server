//向外暴露用户文档模型
const mongoose = require('mongoose')

//建立约束对象
const userSchema  = new mongoose.Schema({
  username: {type: String,required: true},
  password: {type: String,required: true},
  type: {type: String,required: true}
})

//创建对象暴露的文档对象模型

module.exports = mongoose.model('users', userSchema)
