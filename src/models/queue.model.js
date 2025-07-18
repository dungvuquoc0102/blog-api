module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define(
    "Queue",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      payload: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      retries: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      error_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "pending",
      },
    },
    {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Queue;
};
