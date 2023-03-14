const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.fields;
    const avatar = req.files.avatar;
    const avatarName = avatar.path.split('/').slice(-1)[0];
    const avatarExtension = avatarName.split('.').slice(-1)[0];
    const validExtensions = ['gif', 'jpg', 'png'];

    if (
      login &&
      password &&
      phone &&
      avatarName &&
      validExtensions.includes(avatarExtension)
    ) {
      const userWithLogin = await Users.findOne({ login });
      if (userWithLogin) {
        res.status(409).json({ message: 'This login is already taken' });
        return;
      } else {
        const newUser = new Users({
          login,
          password: await bcrypt.hash(password, 10),
          avatar: avatarName,
          phone,
        });
        await newUser.save();
        res.status(201).json({ message: 'User created', newUser });
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.fields;

    if (login && password) {
      const user = await Users.findOne({ login });
      if (!user) {
        res.status(400).json({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {};
          req.session.user.id = user._id;
          req.session.user.login = user.login;
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(400).json({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.session.user.login}`,
  });
};

exports.logout = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy();
      res.status(200).json({ message: 'Logout successful' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
