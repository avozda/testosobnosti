const express = require("express");
const router = express.Router();
const Answer = require("../../models/Answer")
const User = require("../../models/User")
const auth = require('../../middleware/auth');

//@route    GET api/stats
//@desc     najít statistiky
//@access   Private

router.get("/statistics",auth, async(req, res) => {
   try {
    if(!req.user.isAdmin){
        res.status(500).send("K těmto datům nemáš přístup.")
        return
    }

       const answers = await Answer.find().sort({ date: -1 });;
       res.json(answers)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }
})
//@route    GET api/posts
//@desc     najít všechny příspěvky
//@access   Private

router.get("/",auth, async(req, res) => {
   try {
       const answers = await Answer.find({user:req.user.id});
       res.json(answers)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }
})

//@route    POST api/posts
//@desc     vytvořit příspěvek
//@access   Private
router.post("/", auth, async(req, res) => {
   try {
        const user = await User.findOne({_id: req.user.id });
       const newAnswer = new Answer({
           R: req.body.R,
           A: req.body.A,
           I: req.body.I,
           S: req.body.S,
           E: req.body.E,
           C: req.body.C,
           user: req.user.id,
           firstName:user.firstName,
            field:user.field,
            yearOfEntry:user.yearOfEntry,
            lastName:user.lastName
       })

       const answer = await newAnswer.save();
       res.json(answer)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }


})


router.get("/:id", auth, async(req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) {
            return res.status(404).json({ msg: "Výsledek dotazníku nebyl nalezen" });
        }
        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})



module.exports = router;