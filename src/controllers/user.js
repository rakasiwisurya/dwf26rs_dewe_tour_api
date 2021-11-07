const { user } = require("../../models");

const fs = require("fs");

exports.getUsers = async (req, res) => {
  try {
    let data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    const newData = data.map((item) => {
      const avatar = item.avatar
        ? process.env.PATH_AVATAR_IMAGES + item.avatar
        : process.env.PATH_AVATAR_IMAGES + "no-photo.jpg";

      return {
        id: item.id,
        email: item.email,
        fullname: item.fullname,
        phone: item.phone,
        address: item.address,
        gender: item.gender,
        avatar: avatar,
      };
    });

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    const avatar = data.avatar
      ? process.env.PATH_AVATAR_IMAGES + data.avatar
      : process.env.PATH_AVATAR_IMAGES + "no-photo.jpg";

    const newData = {
      ...data,
      avatar: avatar,
    };

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const data = {
    avatar: req.files.avatar[0].filename,
  };

  try {
    const userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (userData.avatar !== null) {
      fs.unlink("uploads/avatars/" + userData.avatar, (err) => {
        if (err) throw err;
      });
    }

    await user.update(data, {
      where: {
        id,
      },
    });

    let updatedData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    updatedData = JSON.parse(JSON.stringify(updatedData));
    const newUpdatedData = {
      ...updatedData,
      avatar: process.env.PATH_AVATAR_IMAGES + updatedData.avatar,
    };

    res.send({
      status: "success",
      data: {
        user: newUpdatedData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete user success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
