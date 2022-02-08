const Todo = require('./todo.model');

const index = async (req, res) => {
  const { id } = req.user;
  try {
    const todos = await Todo.find({ userId: id }).select();
    const responseTodos = todos.map(({ title, description, _id, completed }) => { return { title, description, _id, completed } })
    return res.status(200).send(responseTodos);
  } catch (e) {
    return res.status(400).send({ error: e.toString() });
  }
}

const create = async (req, res) => {
  const { id } = req.user;
  const { title, description, completed } = req.body;
  try {
    const newTodo = await Todo.create({ title, description, completed, userId: id })
    return res.status(200).send(newTodo);
  } catch (e) {
    return res.status(400).send({ error: e.toString() });
  }
}

const edit = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const oldTodo = await Todo.findById({ id });
    if (oldTodo) {
      if (oldTodo.userId === userId) {
        const updateTodo = await Todo.findOneAndUpdate({ id }, { title, description, completed }, { new: true });
        return res.status(200).send(updateTodo);
      } else {
        return res.status(403).send({ error: `You are forbidden to perform this action` });
      }
    } else {
      return res.status(404).send({ error: `No todo found with id=${id}` });
    }
  } catch (e) {
    return res.status(400).send({ error: e.toString() });
  }
}

const destroy = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const oldTodo = await Todo.findById({ id });
    if (oldTodo) {
      if (oldTodo.userId === userId) {
        await Todo.findOneAndDelete({ id });
        return res.status(200).send(oldTodo);
      } else {
        return res.status(403).send({ error: `You are forbidden to perform this action` });
      }
    } else {
      return res.status(404).send({ error: `No todo found with id=${id}` });
    }
  } catch (e) {
    return res.status(400).send({ error: e.toString() });
  }
}

module.exports = {
  index,
  create,
  edit,
  destroy
}