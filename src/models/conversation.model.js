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
      paranoid: true,
    }
  );

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.User, {
      through: "conversation_users",
      foreignKey: "conversation_id",
      otherKey: "user_id",
      as: "participants",
    });

    Conversation.hasMany(models.Message, {
      foreignKey: "conversation_id",
      as: "messages",
    });
  };

  return Conversation;
};
