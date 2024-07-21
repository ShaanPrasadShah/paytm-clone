const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://shaanprasad:*****@cluster0.mhsd3nk.mongodb.net/")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        minLength : 3,
        lowercase : true
    },
    password : {
        type: String,
        required : true,
        minLength : 6
    },
    firstname:{
        String,
        required : true
    },
    lastname :{
        type: String,
        required:true
    } 

})

module.exports = mongoose.model('User',userSchema);