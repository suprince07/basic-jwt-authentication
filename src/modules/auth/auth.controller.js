const _ = require('lodash');
const User = require('../user/user.model');
const { comparePassword } = require('../../utils/auth.util');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../../utils/jwt.util');
const RedisUtils = require('../../utils/redis.util');

const signup = async (req, res) => {
  const body = _.pick(req.body, ['name', 'email', 'password', 'admin']);
  try {
    const oldUser = await User.findOne({ email: body.email });
    if (!oldUser) {
      const newUser = await User.create(body);
      return res.status(200).send({ message: `Signup success` });
    } else {
      return res.status(400).send({ error: `User already exists with email=${body.email}` });
    }
  } catch (e) {
    return res.status(404).send({ error: e.toString() });
  }
}

const login = async (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  try {
    const oldUser = await User.findOne({ email: body.email });
    if (oldUser) {
      if (comparePassword(body.password, oldUser.password)) {
        const tokenPayload = { id: oldUser.id, email: oldUser.email}
        return res.status(200).send({ token: generateToken(tokenPayload), refreshToken: generateRefreshToken(tokenPayload) });
      } else {
        return res.status(400).send({ error: `Invalid Credentials` });
      }
    } else {
      return res.status(400).send({ error: `Invalid Credentials` });
    }
  } catch (e) {
    return res.status(404).send({ error: e.toString() });
  }
}

const refreshToken = async (req, res) => {
  const body = _.pick(req.body, ['refreshToken']);
  const result = verifyRefreshToken(body.refreshToken);
  if (!result.error) {
    return res.status(200).send({ token: generateToken({ id: result.data.id, email: result.data.email }) });
  } else {
    return res.status(400).send({ error: "Invalid refresh token" });
  }
}

const logout = async (req, res) => {
  const { id, token } = req.user;
  try {
    const userData = await RedisUtils.get(id);
    if (userData !== null) {
      const parsedData = JSON.parse(userData);
      parsedData[id].push(token);
      await RedisUtils.set(id, 3600, JSON.stringify(parsedData))
      return res.status(200).send({ message: 'Logout successful' });
    }
    const blacklistData = {
      [id]: [token],
    };
    await RedisUtils.set(id, 3600, JSON.stringify(blacklistData))
    return res.status(200).send({ message: 'Logout successful' });
  } catch (e) {
    return res.status(400).send({ error: e.toString() });
  }
}

module.exports = {
  signup,
  login,
  refreshToken,
  logout
}