const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Najít uživatele z tokenu
// @access   Private
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Ověřit uživatele a získát token
// @access   Public
router.post(
    '/',
    check('email', 'Prosém zadejte platný email').isEmail(),
    check('password', 'Heslo je požadováno').exists(),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Neplatné údaje' }] });
            }

            if(!user.verified){
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Uživatel nebyl ověřen, prosím zkontroluj si email.' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Neplatné údaje' }] });
            }

            const payload = {
                user: {
                    id: user.id,
                    isAdmin: user.isAdmin
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'), { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;