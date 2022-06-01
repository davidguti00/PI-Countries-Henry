const express = require('express');
const { Op } = require('sequelize');
const { Country, Activity, Country_activities } = require('../db')
const router = express.Router();
const axios = require ('axios');
const getActivity = require ('./functions')


router.post('/', async (req,res,next) =>{
    const{name, difficulty, duration, season, countries } = req.body
    try{
        if(name && difficulty && duration && season && countries){ 
            const [newActivity, created] = await Activity.findOrCreate({
                where:{
                    name: name,
                    difficulty: difficulty,
                    duration: duration,
                    season: season,
                },
                include: [{
                    model: Country,
                    where: { name: countries }
                }]
            })

            const countryFind = await Country.findAll({
                where: {
                    name: {
                        [Op.or]: countries
                    }
                }
            })
            await newActivity.addCountries(countryFind)
            if(!created){
                res.status(400).send("This activity was already created in some of the selected countries")
            }else res.status(201).send(newActivity)
            
        } else res.status(404).json("Missing data")
    } catch (err) {
        next(err)
    }
})

// router.get('/', async (req, res, next) => {
//     const activityN = req.params.Activity
//     try {
//         const findActivity = await Activity.findAll({  
//             where: { name: activityN },
//             include: { model: Country},
//         })
//         return res.json(findActivity)
//     }
//     catch (error) {
//         next(error)
//     }
// });
router.get("/", async (req, res, next) => {
    const { name } = req.query
    try {
        const activities = await getActivity(name)
        res.send(activities)

    } catch (error) {
    
        next(error)
    }
})





module.exports = router