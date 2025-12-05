const mongoose = require('mongoose')
const uri = "mongodb+srv://rsoorya824:Mongopass123@cluster0.oy8horl.mongodb.net/?appName=Cluster0/contactManager"
const connectDb = async ()=>{
  try {
    const connect = await mongoose.connect(uri)
    console.log(
        'Database connected :',
        connect.connection.host,
        connect.connection.name
    )
  } catch (error) {
    console.log(error)
  }
}
module.exports = connectDb