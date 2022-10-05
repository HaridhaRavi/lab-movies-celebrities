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
         console.log("Error getting movies from DB",error)
         next(error)
    })
})

//READ -Movie Details
router.get("/movies/:id",(req,res,next)=>{
    const movieID = req.params.id
    Movie.findById(movieID)
        .populate("cast")
        .then((movieDetails)=>{
           console.log(movieDetails)
            res.render("movies/movie-details",movieDetails)
        })
        .catch((error) => {
            console.log("Error getting movie details from DB",error)
            next(error)
       })

})


//DELETE - to delete a movie
router.post("/movies/:id/delete",(req,res,next)=>{
    const movieID = req.params.id
    Movie.findByIdAndRemove(movieID)
        .then(()=>{
            res.redirect("/movies")
        })
        .catch((error) => {
            console.log("Error getting movie details from DB",error)
            next(error)
       })

})

//UPDATE : Display data
router.get("/movies/:id/edit",(req,res,next)=>{
    let movieData;
    Movie.findById(req.params.id)
        .then((response) => {
            movieData = response;
            return Celebrity.find()
        })
        .then((celebrityInfo)=>{
            console.log(movieData)
            console.log(celebrityInfo)
            res.render("movies/edit-movie", {moviesInfo: movieData,allCelebrities: celebrityInfo})
        })
        .catch(error =>{
            console.log("error updating data",error)
            next(error)
        })

})
//UPDATE -process data
router.post("/movies/:id/edit",(req,res,next)=>{
    const movieID = req.params.id
    const {title, genre, plot, cast} = req.body
    const updateData = {title, genre, plot, cast}
    Movie.findByIdAndUpdate(movieID,updateData)
        .then(()=>{
            res.redirect(`/movies/${movieID}`)
        })
        .catch((error) => {
            console.log("Error getting movie details from DB",error)
            next(error)
       })

})
module.exports = router;