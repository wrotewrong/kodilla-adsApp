const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const removeImage = require('../utils/removeImage');
const {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} = require('../backendConfig');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//FORMIDABLE CONTROLLER
// exports.register = async (req, res) => {
//   try {
//     const { login, password, phone } = req.fields;
//     const avatar = req.files.avatar;
//     const avatarName = avatar.path.split('/').slice(-1)[0];
//     const avatarExtension = avatarName.split('.').slice(-1)[0];
//     const validExtensions = ['gif', 'jpg', 'png'];

//     if (
//       login &&
//       password &&
//       phone &&
//       avatarName &&
//       validExtensions.includes(avatarExtension)
//     ) {
//       const userWithLogin = await Users.findOne({ login });
//       if (userWithLogin) {
//         res.status(409).json({ message: 'This login is already taken' });
//         return;
//       } else {
//         const newUser = new Users({
//           login,
//           password: await bcrypt.hash(password, 10),
//           avatar: avatarName,
//           phone,
//         });
//         await newUser.save();
//         res.status(201).json({ message: 'User created', newUser });
//       }
//     } else {
//       res.status(400).json({ message: 'Bad request' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

//MULTER CONTROLLER
exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const avatar = req.file;
    // const expectedInputs = ['login', 'password', 'phone', 'avatar'];
    // const providedInputs = { ...req.body, avatar };
    const fileType = avatar ? await getImageFileType(avatar) : 'unknown';
    const validExtensions = ['image/gif', 'image/jpeg', 'image/png'];

    if (
      login &&
      password &&
      phone &&
      avatar &&
      validExtensions.includes(fileType) &&
      password.length >= PASSWORD_MIN_LENGTH &&
      password.length <= PASSWORD_MAX_LENGTH
    ) {
      const userWithLogin = await Users.findOne({ login });
      if (userWithLogin) {
        if (avatar) {
          removeImage(avatar.filename);
        }
        logger.warn(`Login: ${userWithLogin.login} is already taken`);
        res.status(409).json({ message: 'This login is already taken' });
        return;
      } else {
        const newUser = new Users({
          login,
          password: await bcrypt.hash(password, 10),
          avatar: avatar.filename,
          phone,
        });
        await newUser.save();
        logger.info(`Add new user with id: ${newUser._id}`);
        res.status(201).json({ message: 'User created', newUser });
      }
    } else {
      if (avatar) {
        removeImage(avatar.filename);
      }
      logger.warn('Invalid request received');
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    if (req.file) {
      removeImage(req.file.filename);
    }
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && password) {
      const user = await Users.findOne({ login });
      if (!user) {
        logger.warn('The login does not exist');
        res.status(400).json({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {};
          req.session.user.id = user._id;
          req.session.user.login = user.login;
          logger.info('Logged in');
          res.status(200).json({ message: 'Login successful' });
        } else {
          logger.warn('Login or password are incorrect');
          res.status(400).json({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      logger.warn('Login or password not provided');
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
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
      logger.info('The session has ended');
      res.status(200).json({ message: 'Logout successful' });
    }
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};
