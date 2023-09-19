const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(
      'user_nbcc',
      'user_mo',
      'user_msc',
      'user_uastec',
      'admin_nbcc',
      'admin_mo',
      'admin_msc',
      'admin_uastec',
      'superadmin'
    ),
    defaultValue: 'user_nbcc'
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  }},
  {
    tableName: 'users'
  });

module.exports = User;
