const { country } = require("../../models");

exports.addCountry = async (req, res) => {
  try {
    await country.create(req.body);
    res.send({
      status: "success",
      message: "Add country finished",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const data = await country.findAll({
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

exports.getCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await country.findOne({
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

exports.updateCountry = async (req, res) => {
  const { id } = req.params;

  try {
    await country.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await country.findOne({
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
        country: updatedData,
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

exports.deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    await country.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete country success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
