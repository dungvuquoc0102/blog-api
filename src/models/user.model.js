module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
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
    User.associate = (db) => {};
    return User;
};
