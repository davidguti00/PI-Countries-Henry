const {Op} = require ('sequelize')
const { Country, Activity } = require ('../db')
const { Router, query } = require ('express');
const router = Router();
const axios = require ('axios');


router.get('/', async(req, res, next)=>{
    
    const {name, continent, order, population} = req.query;
    
    
    
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
            try{
                let nameDb = await Country.findAll({
                    where:{
                        name:{[Op.iLike]: `%` + name + `%`},    
                    },
                        order: [['name', 'ASC']],
                });
                if(nameDb.length){
                    return res.json(nameDb)
                } else {
                    return res.send("Country has not been created yet")
                }
            } catch (error){
                next(error)
            }
        } 

        else if(continent){
            try{
                let continentM = await Country.findAll({
                    where:{
                        continent: continent
                    },
                        order: [['name', 'ASC']],
                        limit: 9

                });
                return res.json(continentM)
            }catch (error){
                next(error);
            }
        }
        
        else if(order){
            try{
                let countriesOrder = await Country.findAll({
                    order: [['name', order]],
                });
                    return res.json(countriesOrder)
            }catch (error){
                    next(error);
            }
        }

        else if(population){
            try{
                let populationOrder = await Country.findAll({
                    order: [['population', population]],
                });
                    return res.json(populationOrder)
            }catch (error){
                    next(error);
            }        
        
        }else  {
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

        if(country) return  res.json(country);
        else res.send('Id no match')

    }catch(err){
        next(err)
    }  
})








module.exports = router