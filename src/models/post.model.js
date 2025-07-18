module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
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
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metaTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      metaDescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cover: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "draft",
      },
      viewsCount: {
        type: DataTypes.INTEGER({ unsigned: true }),
        defaultValue: 0,
      },
      likesCount: {
        type: DataTypes.INTEGER({ unsigned: true }),
        defaultValue: 0,
      },
      publishedAt: {
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
  return Post;
};
