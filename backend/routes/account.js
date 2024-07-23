const express = require('express')
const {authMiddleware} = require('../middleware')
const { accountModel } = require('../db')
const { mongo, default: mongoose } = require('mongoose')

const router = express.Router()


router.get('/balance',authMiddleware, async (req,res)=>{
    let account = await accountModel.findOne({userId:req.userId})
    res.json({
        balance : account.balance
    })
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    
    session.startTransaction();

    const {amount,to} = req.body;

    let fromAccount = await accountModel.findOne({userId:req.userId}).session(session)

    if(!fromAccount || fromAccount.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message : 'insufficient balance'
        })
    }

    const toAccount = await accountModel.findOne({userId:to}).session(session)
    if(!toAccount){
        return res.status(400).json({
            message : 'invalid account'
        })
    }

    await accountModel.updateOne({userId:req.userId},{$inc : { balance : -amount}}).session(session)
    await accountModel.updateOne({userId:to},{ $inc : { balance : amount}}).session(session)

    session.commitTransaction()

    res.json({
        message : 'transfer successful'
    })


})

module.exports = router