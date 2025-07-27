module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER({
          unsigned: true,
        }),
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER({
          unsigned: true,
        }),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "refresh_tokens",
    }
  );
  return RefreshToken;
};
