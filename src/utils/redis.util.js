const RedisClient = require('../config/redis.config');

const set = async (userId, timeInSecond, data) => {
  try {
    const result = await RedisClient.setEx(userId, timeInSecond, data);
    return result;
  } catch (e) {
    throw e;
  }
}

const get = async (userId) => {
  try {
    const result = await RedisClient.get(userId);
    return result;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  set, get
}