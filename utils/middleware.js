// middleware.js
const userLOG = require('./static.js');

const logMiddleware = (req, res, next) => {
    const ID = parseInt(req.params.id);
    if (isNaN(ID)) return res.sendStatus(400);
    if (ID < 0 || ID >= userLOG.length) return res.sendStatus(404);
    const findUser = userLOG.findIndex((user) => user.id === ID);
    if (findUser === -1) return res.sendStatus(404); // User not found
    req.FindUser = findUser;
    next();
};

module.exports = logMiddleware;
