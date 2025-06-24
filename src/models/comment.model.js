module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
      },
      parent_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "comments",
          key: "id",
        },
      },
    },
    {
      tableName: "comments",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      engine: "InnoDB",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Comment.associate = (db) => {
    Comment.belongsTo(db.Post);
  };
  return Comment;
};
