const express = require('express');
const { Op } = require('sequelize');
const { Country, Activity, Country_activities } = require('../db')
const {Router} = require ('express');
const router = express.Router();
const axios = require ('axios');


router.post('/', async (req,res,next) =>{
    const{name, difficulty, duration, season, countries } = req.body
    try{
        if(name && difficulty && duration && season && countries){ 
        const newActivity = await Activity.create({
            name, difficulty, duration, season, 
        })
        
        const countriesByName = await Country.findAll({
            where: {
                name: {
                    [Op.or]:countries
                }
            }
        })
        
        countriesByName.forEach(e => {
            return  newActivity.addCountry(e.dataValues.id)
        });
        
        res.status(201).send("activity succefully uploaded")
        }else res.status(404).json("missing data")
    }catch(err){
        next(err)
    }
})



module.exports = router