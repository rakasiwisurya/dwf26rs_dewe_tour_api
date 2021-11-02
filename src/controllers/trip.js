const { trip, country } = require("../../models");

const fs = require("fs");
const pathFile = "localhost:4000/uploads/trips/";
const Joi = require("joi");

exports.addTrip = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    countryId: Joi.number().required(),
    accomodation: Joi.string().min(5).required(),
    transportation: Joi.string().min(5).required(),
    eat: Joi.string().min(5).required(),
    day: Joi.number().required(),
    night: Joi.number().required(),
    dateTrip: Joi.date().required(),
    price: Joi.number().required(),
    quota: Joi.number().required(),
    description: Joi.string().min(10).max(1000).required(),
  });

  const { error } = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const arrayFilename = req.files.image.map((item) => item.filename);

    const newTrip = await trip.create({
      ...req.body,
      image: JSON.stringify(arrayFilename),
    });

    let tripData = await trip.findOne({
      where: {
        id: newTrip.id,
      },
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId"],
      },
    });

    tripData = JSON.parse(JSON.stringify(tripData));

    const newData = {
      ...tripData,
      image: JSON.parse(tripData.image).map((image, index) => ({
        id: index + 1,
        url: pathFile + image,
      })),
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

exports.getTrips = async (req, res) => {
  try {
    let data = await trip.findAll({
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title,
      countries: item.country,
      accomodation: item.accomodation,
      transportation: item.transportation,
      eat: item.eat,
      day: item.day,
      night: item.night,
      dateTrip: item.dateTrip,
      price: item.price,
      quota: item.quota,
      description: item.description,
      image: JSON.parse(item.image).map((image, index) => ({
        id: index + 1,
        url: pathFile + image,
      })),
    }));

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

exports.getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await trip.findOne({
      where: {
        id,
      },
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = {
      ...data,
      image: JSON.parse(data.image).map((image, index) => ({
        id: index + 1,
        url: pathFile + image,
      })),
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

exports.updateTrip = async (req, res) => {
  const { id } = req.params;

  try {
    await trip.update(req.body, {
      where: {
        id,
      },
    });

    let updatedData = await trip.findOne({
      where: {
        id,
      },
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId"],
      },
    });

    updatedData = JSON.parse(JSON.stringify(updatedData));

    const newUpdatedData = {
      ...updatedData,
      image: JSON.parse(data.image).map((image, index) => ({
        id: index + 1,
        url: pathFile + image,
      })),
    };

    res.send({
      status: "success",
      data: newUpdatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await trip.findOne({
      where: {
        id,
      },
    });

    const imageStringToArray = JSON.parse(data.image);

    for (const item of imageStringToArray) {
      fs.unlink("uploads/trips/" + item, (err) => {
        if (err) throw err;
      });
    }

    await trip.destroy({
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
