const { user } = require("../../models");

exports.addUser = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "success",
      message: "Add user finished",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
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
    const data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
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
