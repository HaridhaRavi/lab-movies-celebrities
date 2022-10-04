const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//CREATE:display form
router.get("/celebrities/create",(req,res,next)=>{
    Celebrity.find()
    .then((celebrityList) => {
        console.log(celebrityList)
        res.render("celebrities/new-celebrity",{celebrityList})
    })
    .catch((err) => {
        console.log("Error getting Celebrities list from db",err)
        next()
    })
    
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


module.exports = router;