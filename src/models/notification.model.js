module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      notifiableId: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
      },
      notifiableType: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );
  return Notification;
};
