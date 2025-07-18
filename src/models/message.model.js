module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      conversationId: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "conversations",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING(50),
        defaultValue: "text",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
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
  return Message;
};
