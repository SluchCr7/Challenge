const mongoose = require('mongoose')

const ConnectDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Database Connected')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = ConnectDb