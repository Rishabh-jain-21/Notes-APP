// in fetch user we are just taking token and decoding it into user
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'katrahi$hai';
const fetchuser = (req, res, next) => {
    //decode user from token and get its id
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Aceess denied , please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Aceess denied , please authenticate using valid token" });
    }
}

module.exports = fetchuser;