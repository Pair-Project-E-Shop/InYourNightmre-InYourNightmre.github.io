'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.User,{
        through: models.Chart
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: `name is required`
        },
        notEmpty:{
          msg: `name is required`
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{
          msg: `Description is required`
        },
        notEmpty:{
          msg: `Description is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg: `Price is required`
        },
        notEmpty:{
          msg: `Price is required`
        }
      }
    },
    imageURL: DataTypes.TEXT,
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg: `Category is required`
        },
        notEmpty:{
          msg: `Category is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};