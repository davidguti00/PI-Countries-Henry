const {Op} = require ('sequelize')
const { Country, Activity, Country_activities } = require ('../db')
const { Router } = require ('express');
const router = Router();
const axios = require ('axios');


router.get('/', async(req, res, next)=>{
    
    const { continent, order, population, page} = req.query;
    
    try {

        const allCountries = await Country.findAll({
            limit: 9,
            offset: page,
        });
        
        // if(name){
        //     try{
        //         let nameDb = await Country.findAll({
        //             where:{
        //                 name:{[Op.iLike]: `%` + name + `%`},    
        //             },
        //                 order: [['name', order]],
        //         });
        //         if(nameDb.length){
        //             return res.json(nameDb)
        //         } else {
        //             return res.send("Country has not been created yet")
        //         }
        //     } catch (error){
        //         next(error)
        //     }
        // } 

        if(continent){
            try{
                let continentM = await Country.findAll({
                    where:{
                        continent: continent
                    },
                        order: [['name', order]],
                        limit: 10
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
                    limit: 10,
                    offset: page,
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
                    limit: 10,
                    offset: page,
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
        });
        if(country) return  res.json(country);
        else res.send('Id no match')

    }catch(err){
        next(err)
    }  
})

router.get('/search/:name', async (req, res, next)=>{
    const nameSeach = req.params.name;
        try{
            let nameDb = await Country.findAll({
                where:{
                    name:{[Op.iLike]: `%` + nameSeach + `%`},    
                },
                    order: [['name', "ASC"]],
                    limit: 10,
            });
            if(nameDb.length){
                return res.send(nameDb)
            } else {
                return res.send("Country has not been created yet")
            }
        } catch (error){
            next(error)
        }
})








module.exports = router