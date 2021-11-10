const { transaction, user, trip, country } = require("../../models");

const Joi = require("joi");

exports.addTransaction = async (req, res) => {
  const schema = Joi.object({
    counterQty: Joi.number().required(),
    total: Joi.number().required(),
    tripId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    console.log(error);
    return res.status(400).send({
      status: "failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const data = req.body;
    const { id } = req.user;
    // console.log(req.user);
    // const attachment = req.files ? req.files.attachment[0].filename : null;

    const newTransaction = await transaction.create({
      ...data,
      userId: id,
      status: "Waiting Payment",
      attachment: null,
    });

    const transactionData = await transaction.findOne({
      where: {
        id: newTransaction.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
          },
        },
        {
          model: trip,
          as: "trip",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });

    // transactionData = JSON.parse(JSON.stringify(transactionData));

    // const confirmAttachment = transactionData.attachment
    //   ? process.env.PATH_PROOF_IMAGES + transactionData.attachment
    //   : null;

    // const newTransactionData = {
    //   ...transactionData,
    //   attachment: confirmAttachment,
    // };

    res.send({
      status: "success",
      message: "Book succesfull added to your transaction",
      data: transactionData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    let data = await transaction.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role", "avatar"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "countryId",
              "description",
              "quota",
              "image",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "tripId"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => {
      let attachment = item.attachment
        ? process.env.PATH_PROOF_IMAGES + item.attachment
        : null;

      return {
        id: item.id,
        counterQty: item.counterQty,
        total: item.total,
        status: item.status,
        attachment: attachment,
        createdAt: item.createdAt,
        trip: item.trip,
        user: item.user,
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

exports.getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
          },
        },
        {
          model: trip,
          as: "trip",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "tripId"],
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

exports.updatePay = async (req, res) => {
  const { id } = req.params;

  const data = {
    status: "Waiting Approve",
    attachment: req.files.attachment[0].filename,
  };

  try {
    await transaction.update(data, {
      where: {
        id,
      },
    });

    const updatedData = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role", "avatar"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "countryId",
              "description",
              "quota",
              "image",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "tripId"],
      },
    });

    res.send({
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateConfirmTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await transaction.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role", "avatar"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "countryId",
              "description",
              "quota",
              "image",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "tripId"],
      },
    });

    res.send({
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await transaction.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete trip success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
