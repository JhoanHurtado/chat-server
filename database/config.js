const mongoose = require('mongoose');

const dbConnection = async () => {
    try {     
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // connectTimeoutMS: 1000,
        });
        console.log('Db is Online');

    } catch (error) {
        console.log(error);
        console.log('ERROR: Erro in Db, - talk to admin')
        // throw new Error('Erro in Db, - talk to admin')
    }
}

module.exports ={
    dbConnection
}