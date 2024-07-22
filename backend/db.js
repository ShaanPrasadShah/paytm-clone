const { default: mongoose } = require("mongoose");
const { number } = require("zod");

mongoose.connect("mongodb+srv://shaanprasad:*****@cluster0.mhsd3nk.mongodb.net/")

const userSchema = new mongoose.Schema({
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

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        red : 'User',
        required : true
    },
    balance : {
        type : number,
        required : true
    }
})

const userModel = mongoose.model('User',userSchema);
const accountModel = mongoose.model('Account',accountSchema)


module.exports = {
    userModel,
    accountModel
}