const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//CREATE:display form
router.get("/celebrities/create",(req,res,next)=>{
        res.render("celebrities/new-celebrity")
    
})

//CREATE:process form
router.post("/celebrities/create",(req,res,next)=>{
    const {name, occupation, catchPhrase} = req.body;
    const celebrityData = {name, occupation, catchPhrase};
    Celebrity.create(celebrityData)
        .then((response) => {
            console.log("Created new celebrity successfully",response);
            res.redirect("/celebrities")
        })
        .catch((error) => {
            console.log("Error saving data in DB",error)
            next(error)
            res.redirect("celebrities/new-celebrity")
        })
    
})


router.get("/celebrities",(req,res,next)=>{
    Celebrity.find()
        .then(celebrityFromDb => {
            console.log(celebrityFromDb)
            res.render("celebrities/celebrities",{celebrityFromDb})
        })
        .catch((error) => {
             console.log("Error getting celebrities from DB",error)
             next(error)
        })

})

module.exports = router;