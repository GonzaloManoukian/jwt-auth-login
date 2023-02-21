/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const cookieHeader = req.headers['cookie']; // NOT RECEIVING!
    console.log(cookieHeader);
    if (cookieHeader) {
        const token = cookieHeader.split('=')[1];
        if (!token) return res.status(401).json({ error: 'Access denied' })
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next()
        } catch (error) {
            res.status(400).json({ error: 'Invalid token' })
        }
    } else {
        res.json({ status: 'LOGGED_OUT' })
    }
}

module.exports = verifyToken;