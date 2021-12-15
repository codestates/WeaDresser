"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { User, Diarie, DiariesHashtag, Post, Like, Hashtag } = sequelize.models;

// ! user-diarie 조인 할때, 별칭 처리 해결이 안되면 이부분을 model 에 정의해서 사용해야 할듯
// User 1 : N  Diarie
User.hasMany(Diarie, { foreignKey: "userId", sourceKey: "id" });
Diarie.belongsTo(User, {
  foreignKey: "userId",
  as: "U",
  onDelete: "cascade",
  sourceKey: "id",
});

// User 1 : N  Like
User.hasMany(Like, { foreignKey: "userId", sourceKey: "id" });
Like.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "cascade",
  sourceKey: "id",
});

// Diarie 1 : N  Like
Diarie.hasMany(Like, { foreignKey: "diariesId", sourceKey: "id" });
Like.belongsTo(Diarie, {
  foreignKey: "diariesId",
  onDelete: "cascade",
  sourceKey: "id",
});

// * Diarie  N: M  Hashtag
// Diarie 1 : N  DiariesHashtag
Diarie.hasMany(DiariesHashtag, { foreignKey: "diariesId", sourceKey: "id" });
DiariesHashtag.belongsTo(Diarie, {
  foreignKey: "diariesId",
  as: "H",
  onDelete: "cascade",
  sourceKey: "id",
});

// Hashtag 1 : N  DiariesHashtag
Hashtag.hasMany(DiariesHashtag, { foreignKey: "hashtagsId", sourceKey: "id" });
DiariesHashtag.belongsTo(Hashtag, {
  foreignKey: "hashtagsId",
  onDelete: "cascade",
  sourceKey: "id",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
