const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const generateJWT = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  console.log(user);

  return new Promise((resolve, reject) => {
    const payload = {
      id,
      user_name: user.fullName,
      mail_address: user.personalEmail,
    };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
