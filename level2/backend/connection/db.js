var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config()


mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    keepAlive:true,
    keepAliveInitialDelay:300000,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
});
