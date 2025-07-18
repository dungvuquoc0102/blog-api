module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER({
          unsigned: true,
        }),
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lastMessagedAt: {
        type: DataTypes.DATE,
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
  return Conversation;
};
