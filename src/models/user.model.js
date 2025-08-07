module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER({
          unsigned: true,
        }),
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      twoFactorEnabled: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      twoFactorSecret: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      avatar: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      backgroundImage: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      about: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      postsCount: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      address: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      websiteUrl: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      xUrl: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      githubUrl: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      linkedinUrl: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      verifiedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      resetPasswordAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      provider: {
        type: DataTypes.STRING(50),
        defaultValue: "local",
      },
      providerId: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
    },
    {
      paranoid: true, // Enables soft delete (logical delete instead of physical)
    }
  );

  User.associate = function (models) {
    User.belongsToMany(models.Conversation, {
      through: "conversation_users",
      foreignKey: "user_id",
      otherKey: "conversation_id",
      as: "conversations",
    });
  };

  return User;
};
