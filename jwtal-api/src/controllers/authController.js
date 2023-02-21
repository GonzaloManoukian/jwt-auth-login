/* eslint-disable no-undef */
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidationSchema, loginValidationSchema } = require('../validations/authValidations')


const register = async (req, res) => {
    // Validate Request Body
    const { error } = registerValidationSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const doesEmailExist = await User.findOne({ email: req.body.email });
    if (doesEmailExist) return res.json({ status: 'EXISTING_EMAIL' })

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    try {
        const savedUser = await user.save();
        return res.json({
            status: 'USER_REGISTERED',
            user: savedUser
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const login = async (req, res) => {
    const { error } = loginValidationSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ status: 'INCORRECT_DATA' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.json({ status: 'INCORRECT_DATA' })

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        status: 'LOGIN_OK',
        token: token
    })
}

const logout = (req, res) => {
    // TODO: Implement method
    // res.clearCookie('jwt');
    res.json({ status: 'LOGOUT_OK' })
}

module.exports = {
    register,
    login,
    logout
}