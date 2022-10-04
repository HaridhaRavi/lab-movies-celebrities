const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

//CREATE Movie

router.get("/movies/create", (req,res,next) => {
    Celebrity.find()
    .then(CelebrityData => {
        console.log(CelebrityData)
        res.render("movies/new-movie",{CelebrityData})
    })
    .catch((err) => {
        console.log("Error creating movies list in db",err)
        next()
    })
})
    
router.post("/movies/create", (req,res,next) => {
    const {title,genre,plot,cast} = req.body;
    const newMovieData = {title,genre,plot,cast};
    console.log(newMovieData)
    Movie.create(newMovieData)
        .then((moveData)=>{
            console.log("Movie created succesfully in DB",moveData)
            res.redirect("/movies")
        })
        .catch(error => {
            console.log("Error creating movie", error)
        })
})

router.get("/movies", (req,res,next) => {
    Movie.find()
    .then(movieFromDb => {
        console.log(movieFromDb)
        res.render("movies/movies",{movieFromDb})
    })
    .catch((error) => {
         console.log("Error getting celebrities from DB",error)
         next(error)
    })
})

module.exports = router;