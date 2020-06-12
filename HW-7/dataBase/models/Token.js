module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: 'tokens',
            timestamps: false
        })

    return Token;
};