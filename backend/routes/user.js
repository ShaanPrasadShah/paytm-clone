const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const zod = require('zod')
const JWT_SECRET = require('../config')
const authMiddleware = require('../middleware')
const router = express.Router() 
const userModel = require('../db')
const accountModel = require('../db')

const signupSchema = zod.object({
    username : zod.string().email(),
    password :zod.string(),
    firstname : zod.string(),
    lastname : zod.string()
})

const updateSchema = zod.object({
    password : zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional(),
})


router.post('/signup',async(req,res)=>{
    const {firstname,lastname,username,pasword} = req.body;
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message : 'fill data carefully'
        })
    }
    const user = await userModel.findOne({username})
    if(user){
        return res.status(404).send('user is already present')
    }
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            let createdUser = await userModel.create({firstname,lastname,username,pasword:hash})
            let token = jwt.sign({userId : user._id},JWT_SECRET)
            res.json({message : 'user created successfully',token});

            await accountModel.create({userId:createdUser._id,balance:1+Math.random()*10000})
        });
    });
})

router.post('/signin',async (req,res)=>{
    const {firstname,lastname,username,pasword} = req.body;
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message : 'fill data carefully'
        })
    }
    const user = await userModel.findOne({username})
    if(user){
        bcrypt.compare(pasword,user.password,(error,result)=>{
            if(!result){
                return res.status(401).json({
                    message : 'invalid credentials'
                });
            }
            res.json({
                message: 'signed in successfully'
            })
        })
    }
})

router.put('/',authMiddleware,async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : 'error while updating'
        })
    }
    await userModel.updateOne(req.body,{
        id : req.userId
    })

    res.json({
        message : 'updated sucessfully'
    })

})

router.get('/bulk',async ()=>{
    const filter = req.query.filter || ""

    const users = await userModel.find({
        $or : [{
            firstname : {
                '$regex' : filter 
            }
        },{
            lastname :{
                '$regex' : filter
            }
        }]
    })

    res.json({
        user : users.map(user=>({
            password : user.password,
            lastname : user.lastname,
            firstname :user.firstname,
            _id : user._id
        }))
    })
})

module.exports = router;