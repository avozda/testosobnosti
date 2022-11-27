const express = require("express");
const router = express.Router();
const Question = require("../../models/Question")
const auth = require('../../middleware/auth');

//@route    GET api/posts
//@desc     najít všechny příspěvky
//@access   Private

router.get("/",auth, async(req, res) => {
   try {
       const posts = await Question.find();
       res.json(posts)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }
})

module.exports = router;