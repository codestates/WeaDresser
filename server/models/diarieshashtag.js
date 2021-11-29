'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiariesHashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DiariesHashtag.init({
    diariesId: DataTypes.INTEGER,
    hashtagsId: DataTypes.INTEGER,
    postsId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DiariesHashtag',
  });
  return DiariesHashtag;
};