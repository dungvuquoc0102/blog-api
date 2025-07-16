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
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      two_factor_enabled: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      last_name: {
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
      title: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      about: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      posts_count: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      address: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      website_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      x_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      github_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      verified_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      engine: "InnoDB",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Conversation.associate = (db) => {
    Conversation.hasMany(db.RefreshToken);
  };
  return Conversation;
};
