
const { Country, Activity } = require ('../db')
const { Router } = require ('express');
const router = Router();
const axios = require ('axios');


router.get('/', async(req, res, next)=>{
    
    const {name} = req.query;
    const nameM = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
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
        }));
        if(name){
            const countryName = await allCountries.filter(e=>e.name.includes(nameM));
            
                if(countryName.length){
                res.json(countryName);
                
            } else {
                return res.send("Country has not been created yet")
            }
        }else{
            return  res.json(allCountries) 
        }

    }catch (error){
        next(error);
    }
});


router.get('/:id',async (req,res,next) => {
    const idCountry = req.params.id;
    const idCountryM = idCountry.toUpperCase();
    
    try{
        const country = await Country.findOne({
            where: { id: idCountryM },
            include: Activity
        });;

        if(country) return  res.status(200).json(country);
        else res.status(400).send('Id no match')

    }catch(err){
        next(err)
    }  
})




module.exports = router