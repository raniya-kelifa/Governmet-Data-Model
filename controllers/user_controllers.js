
const userModel = require('../models/user-model')
const infoModel = require('../models/information')
const { db } = require('../models/information')

exports.All = async (req, res) => {

    try {

        // return res.json(req.state.user)
        const users = await userModel.find({})
       if(users!==null){
        res.send('You are admin and have permission to insert and edit data')
        infoModel.create({
            institutions: req.body.institutions,
            employees: req.body.employees,
            serviceGiven: req.body.serviceGiven,
            budget:req.body.budget

        }).then (data =>{
            db.collection('information').insertOne(data);
            console.log('RECOREDED')
        })
       // res.json(users)
            
       } 
       else {
        res.send('You are not the admin you can only view the data')
        db.collection('information').find({})
       }

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
    
}

exports.get = async (req, res) => {

    try {
        console.log(req.params);
        const user = await userModel.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.create = async (req, res) => {
    try {

        const user = await userModel.create(req.body)

        res.json(user)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }

}

exports.update = async (req, res) => {

    try {
        let user = await userModel.findById(req.params.id)
        if(user) {
            user = await userModel.updateOne({_id: user._id}, req.body)
            return res.json(user)
        }

        throw new Error('User dosen\'t exist')
       

        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}

exports.remove = async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id)
        if(user) {
            await userModel.remove({
                _id: user._id
            })
            return res.json(user)
        }
        throw new Error('User doesn\t exist')

    } catch (error) {
        
    }
}