const { verifyToken } = require('../utils/jwt.util')
const RedisUtils = require('../utils/redis.util')
const checkAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    if (decoded.error) {
      return res.status(401).send(decoded);
    }
    const data = await RedisUtils.get(decoded.data.id)
    if (data != null) {
      const parsedData = JSON.parse(data);
      if (parsedData[decoded.data.id].includes(token)) {
        return res.status(401).send({
          message: 'You have to login!',
        });
      }
    }
    req.user = decoded.data;
    req.user['token'] = token;
    return next();
  } else {
    return res.status(401).send({
      error: 'You are not authorized.'
    });
  }
}

module.exports = {
  checkAuthenticated,
};
