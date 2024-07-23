const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const zod = require('zod')
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware')
const router = express.Router() 
const {userModel,accountModel} = require('../db')


const signupSchema = zod.object({
    username : zod.string().email(),
    password :zod.string(),
    firstname : zod.string(),
    lastname : zod.string()
})
const signinSchema = zod.object({
    username : zod.string().email(),
    password :zod.string()
})

const updateSchema = zod.object({
    password : zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional(),
})


router.post('/signup',async(req,res)=>{
    const {firstname,lastname,username,password} = req.body;
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
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            let createdUser = await userModel.create({firstname,lastname,username,password:hash})
            const userId = createdUser._id;
            await accountModel.create({userId,balance:1+Math.random()*10000})

            let token = jwt.sign({userId},JWT_SECRET)
            res.json({message : 'user created successfully',token});

            
        });
    });
})

router.post('/signin',async (req,res)=>{
    const {username,password} = req.body;
    const {success} = signinSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message : 'fill data carefully'
        })
    }
    const user = await userModel.findOne({username})
    if(user){
        bcrypt.compare(password,user.password,(error,result)=>{
            if(!result){
                return res.status(401).json({
                    message : 'invalid credentials'
                });
            }
            const userId = user._id;
            let token = jwt.sign({userId},JWT_SECRET)
            res.json({
                message: 'signed in successfully',
                token
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