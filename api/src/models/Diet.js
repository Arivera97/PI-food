const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Diet = sequelize.define('Diet', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });

  return Diet;
};
