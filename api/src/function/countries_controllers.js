
const { Country, Activity } = require ('../db')
const { Router } = require ('express');
const router = Router();
const axios = require ('axios');



router.get('/', async(req, res, next)=>{
    try {
        const allCountries = (await axios('https://restcountries.com/v3/all')).data.map(e=>({
            id: e.ccn3,
            name: e.name.common,
            image: e.flags[0],
            continent: e.continents[0],
            capital: e.capital || ["Has no capital"],
            subRegion: e.subregion || "Does not have",
            area: e.area,
            population: e.population
        }))
        return  res.json(allCountries)

    }catch (error){
        next(error);
    }
});

// router.get('/:id', async (req, res) => {
//     const idCountry = req.params.id.toUpperCase()

//     try{
//         const searchCountry = await Country.findByPk(idCountry, {
//             include: Activity
//         })
//         searchCountry
//             ? res.json(searchCountry)
//             : res.status(404).send(`${idCountry} Doesnt Exist`)
//     } catch (error) {
//         return res.status(500).send('Error',error)
//     }
// })



// router.put('/update/:id', async (req,res,next) => {
//     var id = req.params.id;
//     id = parseInt(id)
//     const {name, dificult, duration, season} = req.body;
//     try{
//         if(id){
//             const update = await  Activity.update({
//                 name: name,
//                 dificult: dificult,
//                 duration: duration,
//                 season: season
//             },
//             { where: {
//                     id: id
//                 }
//             })
//             res.json(update);
//         }
//     }catch(err){
//         next(err)
//     }
// })






module.exports = router