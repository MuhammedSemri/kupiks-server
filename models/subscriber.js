'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  subscriber.init({
    uid: DataTypes.STRING,
    email: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    agreed_to_subscribe: DataTypes.BOOLEAN,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subscriber',
  });
  return subscriber;
};