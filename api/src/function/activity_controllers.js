const { Country, Activity } = require('../db');
const {Router} = require ('express');
const router = Router();
const axios = require ('axios');


router.post('/', async(req, res, next) => {
    const {name, dificult, duration, season, type, activity} = req.body;
    try {
        const newActivity = await Activity.create({
            name, dificult, duration, season, type
        });
        const actividad = await Activity.findAll(
            {where:
                {name: activity}
            }
        )
        newActivity.addCountry(actividad)
        res.send("activity created");
    }catch(error){
        console.log(error)
        next(error);

    }
});

module.exports = router