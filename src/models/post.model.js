module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
      topic_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "topics",
          key: "id",
        },
      },
    },
    {
      tableName: "posts",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      engine: "InnoDB",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Post.associate = (db) => {
    Post.hasMany(db.Comment);
    Post.belongsTo(db.Topic);
  };
  return Post;
};
