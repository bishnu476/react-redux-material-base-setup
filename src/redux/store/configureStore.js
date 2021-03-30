if (process.env === 'production') {
 module.exports = require('./configureStore.prod');
}else{
    module.exports = require('./configureStore.dev');
}
