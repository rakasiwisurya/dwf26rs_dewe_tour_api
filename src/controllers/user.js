const { user } = require("../../models");

const pathFile = "http://localhost:4000/uploads/avatar/";

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
        ? pathFile + item.avatar
        : pathFile + "no-photo.jpg";

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
      ? pathFile + data.avatar
      : pathFile + "no-photo.jpg";

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

  try {
    await user.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user: updatedData,
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
