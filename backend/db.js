const { default: mongoose } = require("mongoose");
const { number } = require("zod");

const uri = "mongodb+srv://prasadshaan:%40ShaanR12@cluster0.mhsd3nk.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas:', err));


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minLength : 3,
        lowercase : true,
        trim : true
    },
    password : {
        type: String,
        required : true,
        minLength : 6
    },
    firstname:{
        type : String,
        required : true,
        trim : true
    },
    lastname :{
        type: String,
        required:true,
        trim : true
    } 

})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        red : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
       
    }
})

const userModel = mongoose.model('User',userSchema);
const accountModel = mongoose.model('Account',accountSchema)


module.exports = {
    userModel,
    accountModel
}