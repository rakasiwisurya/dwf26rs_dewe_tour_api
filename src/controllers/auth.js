const { user } = require("../../models");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // create validation schema

  const schema = Joi.object({
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(5).required(),
    fullname: Joi.string().min(5).required(),
    phone: Joi.number().min(10).required(),
    address: Joi.string().min(10).required(),
    gender: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "Failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userData = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userData) {
      return res.status(400).send({
        status: "Failed",
        message: "Email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const avatar = req.files ? req.files.avatar[0].filename : null;

    const newUser = await user.create({
      ...req.body,
      password: hashedPassword,
      avatar: null,
      role: "user",
    });

    // generate token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.TOKEN_KEY
    );

    res.send({
      status: "Success",
      message: "Your account has succesfully created",
      data: {
        email: newUser.email,
        fullname: newUser.fullname,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  // create validation schema

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "Failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    let userData = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userData) {
      return res.status(400).send({
        status: "Failed",
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userData.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Password is incorrect",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: userData.id, role: userData.role },
      process.env.TOKEN_KEY
    );

    userData = JSON.parse(JSON.stringify(userData));

    const avatar = userData.avatar
      ? process.env.PATH_AVATAR_IMAGES + userData.avatar
      : process.env.PATH_AVATAR_IMAGES + "no-photo.jpg";

    const newDataUser = {
      id: userData.id,
      fullname: userData.fullname,
      email: userData.email,
      gender: userData.gender,
      phone: userData.phone,
      address: userData.address,
      role: userData.role,
      avatar: avatar,
      token,
    };

    res.send({
      status: "success",
      message: "Login succesful",
      data: newDataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    let userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!userData) {
      return res.status(404).send({
        status: "failed",
      });
    }

    userData = JSON.parse(JSON.stringify(userData));

    const avatar = userData.avatar
      ? process.env.PATH_AVATAR_IMAGES + userData.avatar
      : process.env.PATH_AVATAR_IMAGES + "no-photo.jpg";

    const newUserData = {
      id: userData.id,
      fullname: userData.fullname,
      email: userData.email,
      gender: userData.gender,
      phone: userData.phone,
      address: userData.address,
      role: userData.role,
      avatar: avatar,
    };

    res.send({
      status: "success",
      data: {
        user: newUserData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
