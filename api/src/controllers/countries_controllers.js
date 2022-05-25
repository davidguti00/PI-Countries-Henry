
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

//GET /countries/{idPais}:
//Obtener el detalle de un país en particular
//Debe traer solo los datos pedidos en la ruta de detalle de país
//Incluir los datos de las actividades turísticas correspondientes
router.get('/:id',async (req,res,next) => {
    const idcountry = req.params.id;
    try{
        const country = await Country.findOne({
            where: { code: idcountry },
            include: Activity
        });;

        if(country) return  res.status(200).json(country);
        else res.status(400).send('Id no match')

    }catch(err){
        next(err)
    }  
})




module.exports = router