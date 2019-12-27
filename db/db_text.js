/**
 * 测试使用mongoose操作mongodb 数据库
 * 
 * 1 连接数据库
 *  1.1  引入mongoose
 *  1.2  连接指定数据库 （URL 只有数据可是变化的）
 *  1.3  获取连接对象
 *  1.4  绑定连接完成的监听 （用来提示连接成功）
 * 
 * 2  得到对应的特定集合的Model
 *  2.1  定义Schema （描述文档结构）
 *  2.2  定义Model （与集合对应，可以操作集合）
 * 
 * 3  通过Model对象 对集合数据进行 CRUD操作
 *  3.1  通过Model实例的create()添加数据
 *  3.2  通过Model实例的find()/findOne() 查询多个或一个数据
 *  3.3  通过Model实例的findByIdAndUpdate() 更新某个数据
 *  3.4  通过Model实例的remove() 删除匹配的数据  重要操作
 */
//是一个md5加密的函数
const md5 =  require('blueimp-md5')
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test5',{
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

//获取连接对象  并绑定监听 确认连接成功
mongoose.connection.on('connected', () => console.log('数据库连接成功'))

//2 得到对应的特定集合的Model

//Schema 约束对象  定义文档的数据结构
const userSchema =  mongoose.Schema({
  username: {type: String,required: true},
  password: {type: String,required: true},
  type: {type: String,required: true}
})

//users 集合名称
const UserModel =  mongoose.model('users', userSchema)

//CRUD

//添加数据 create
// async function testSave() {
//   const result = await UserModel.create({username: 'bob', password: md5('123456'), type: 'lanban'})
//   console.log('save()',result)
// }
// testSave()

//查询数据
async function testFind() {
  //find  任何时候都返回一个数组
  const result = await UserModel.find({_id: '5e034a8e52ef93d59907159c'})
  //findOne  有 返回对象 没有 返回null
  const result2 = await UserModel.findOne({_id: '5e034a8e52ef93d59907159c'})
  console.log('find()', result)
  console.log('findOne()', result2)
}

testFind()
