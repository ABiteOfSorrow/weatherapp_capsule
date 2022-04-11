var mongoose = require('mongoose');

var options = {
    connectTimeoutMs: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://crelan:aa6690266@weatherapp.a2enh.mongodb.net/weatherapp?retryWrites=true&w=majority',
options,function(error){
    if(error){
        console.log(error);
    } else{
        console.log("connection OK")
    }}
);

var citySchema = mongoose.Schema({
    name: String,
    weather: String,
    img: String,
    temp_max: Number,
    temp_min: Number,
    lon: Number,
    lat: Number
})

var cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;