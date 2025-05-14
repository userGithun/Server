const mongoose = require('mongoose');
const local_url = 'mongodb://127.0.0.1:27017/api'

const connectDB = async () => {
    return mongoose.connect(local_url)
    .then(()=>{
        console.log('Connected to the database');
    }).catch((error)=>{
        console.log(error)
    })

}
module.exports = connectDB;