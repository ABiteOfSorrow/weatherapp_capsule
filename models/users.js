var mongoose = require('mongoose');

var options = {
    connectTimeoutMs: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.createConnection('mongodb+srv://crelan:aa6690266@weatherapp.a2enh.mongodb.net/users?retryWrites=true&w=majority',
options,function(error){
    if(error){
        console.log(error);
    } else{
        console.log("connection OK")
    }}
);

var usersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: Number
})

var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;