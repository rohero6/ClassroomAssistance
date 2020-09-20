// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    const result = await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      page:"pages/my/my",
      lang:'zh_CN',
      data:{
        name1:{
          value:event.name
        },
        thing2:{
          value:event.space
        },
        phrase14: {
          value: "成功"
        },
        time22: {
          value: event.time1
        },
        time23: {
          value: event.time2
        }
      },
      templateId:"92oVEzAhY_z8QzUG95lkCCWJUsErVzKmygflhVndEko",
      miniprogramState: 'trial'
    })
    console.log(result)
    return result
  }catch(err){
    console.log(err)
    return err
  }
}