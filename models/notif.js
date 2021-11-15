"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      notif.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  notif.init(
    {
      message: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "notif",
    }
  );
  return notif;
};
