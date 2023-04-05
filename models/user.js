'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
      User.belongsToMany(models.Product,{
        through: models.Chart
      })
    }
  }
  User.init({
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        notNull:{
          msg: `email is required`
        },
        notEmpty:{
          msg: `email is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: `password is required`
        },
        notEmpty:{
          msg: `password is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate:(user) => {
        user.role = "user"
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    }
  });
  return User;
};