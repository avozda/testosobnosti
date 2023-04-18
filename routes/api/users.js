const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const apiKey = config.get("emailAPI");
const { check, validationResult } = require("express-validator");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(apiKey);
const User = require("../../models/User");

//@route    POST api/users
//@desc     Registrace
//@access   Public
router.post(
  "/",
  [
    check("field", "Obor je požadován").not().isEmpty(),
    check("yearOfEntry", "Ročník je požadován").not().isEmpty(),
    check("email", "Prosím zadej platný email").isEmail(),
    check("email", "Nemáš oprávnění k registraci.").custom(
      (value, { req }) =>
        value.includes("@creativehill.cz") && value.split("@")[0].includes(".")
    ),
    check("password", "Prosím zadej heslo s 6 znaky").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, field, yearOfEntry } = req.body;
    const verified = false;
    const isAdmin = false;
    let name = email.split("@");
    name = name[0].split(".");
    const firstName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
    const lastName = name[1].charAt(0).toUpperCase() + name[1].slice(1);

    try {
      // uživatel existuje?
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Uživatel s tímto emailem již existuje" }] });
      }
      user = new User({
        firstName,
        lastName,
        email,
        password,
        field,
        yearOfEntry,
        verified,
        isAdmin,
      });
      if (field !== "MD" && field !== "VMA" && field !== "MT") {
        return res.status(500).json({ errors: [{ msg: "Neplatné údaje" }] });
      }
      if (!yearOfEntry.includes("/")) {
        if (
          isNaN(yearOfEntry.split("/")[0]) ||
          isNaN(yearOfEntry.split("/")[1])
        ) {
        }
      }

      const datum = new Date();
      let mesic = datum.getMonth() + 1;
      let rok = datum.getFullYear();
      let nastupPrvaku;

      if (mesic > 8) {
        nastupPrvaku = rok - 3;
      } else {
        nastupPrvaku = rok - 4;
      }

      const vyberLet = [];
      for (let i = 1; i < 5; i++) {
        let roky = nastupPrvaku + i - 1 + "/" + (nastupPrvaku + i);
        vyberLet.push(roky);
      }

      if (!vyberLet.includes(yearOfEntry)) {
        return res.status(500).json({ errors: [{ msg: "Neplatné údaje" }] });
      }

      // encrypt heslo
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 3600,
      });

      const url = "http://localhost:4000/api/users/" + token;

      const mailOptions = {
        from: "Dotazník pracovního zaměření osobnosti RIASEC <testosobnosti@outlook.cz>",
        to: email,
        subject: "Ověření emailové adresy",
        text: "Pro ověření emailové adresy použijte následující odkaz: " + url,
      };

      sgMail
        .send(mailOptions)
        .then((response) => {
          console.log("Email sent: " + response);
        })
        .catch((err) => console.log(err));
      res.json("Success");
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  }
);

//@route    GET api/posts/:id
//@desc     najít příspěvek podle id
//@access   Private
router.get("/:token", async (req, res) => {
  const token = req.params.token;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Nebyl nalezen token, ověření zamítnuto" });
  }

  try {
    let id;

    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        id = decoded.user.id;
      }
    });

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Uživatel nebyl nalezen" });
    }

    user.verified = true;
    await user.save();

    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
