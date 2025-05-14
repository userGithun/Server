const mongoose = require('mongoose');
const local_url = 'mongodb://127.0.0.1:27017/api'
const live_URL = 'mongodb+srv://chacha45454:ram123@cluster0.edlqo.mongodb.net/Mernstack ?retryWrites=true&w=majority&appName=Cluster0'


const connectDB = async () => {
    return mongoose.connect(live_URL)
    .then(()=>{
        console.log('Connected to the database');
    }).catch((error)=>{
        console.log(error)
    })

}
module.exports = connectDB;