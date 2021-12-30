'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const user = require('./user');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { Diarie,  User, Like, Hashtag, DiariesHashtag } = sequelize.models;
User.hasMany(Diarie, { foreignKey : 'userId', onDelete: 'CASCADE'} );
User.hasMany(Like, { foreignKey : 'userId', onDelete: 'CASCADE'});

Diarie.belongsTo(User, { foreignKey : 'userId',onDelete: 'CASCADE' });
Diarie.hasMany(Like, { foreignKey : 'diarieId', onDelete: 'CASCADE'});

Like.belongsTo(User, {  foreignKey : 'userId', onDelete: 'CASCADE'});
Like.belongsTo(Diarie, { foreignKey : 'diarieId', onDelete: 'CASCADE'});

Diarie.belongsToMany(Hashtag, { through : DiariesHashtag });
Hashtag.belongsToMany(Diarie, { through : DiariesHashtag });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;