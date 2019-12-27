//连接数据库
const mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test5', {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

//确认连接
mongoose.connection.on('connected',() => console.log('数据连接成功'))
