const User = require('./user.model')

const index = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ error: 'No user found' });
    }
  } catch (e) {
    return res.status(404).send({ error: e.toString() });
  }
}

const edit = async (req, res) => {
  const { id } = req.user;
  const { name, password } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ id }, { name, password }, { new: true });
    return res.status(200).send(updatedUser);
  } catch (e) {
    return res.status(404).send({ error: e.toString() });
  }
}

module.exports = {
  index,
  edit
}