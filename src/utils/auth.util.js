const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword
}