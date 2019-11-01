const bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            VALIDATE: {
                notEmpty: true
            }
        }
    });

    Users.addHook("beforeCreate", (user, Option) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
    });

    Users.associate = function(models) {
        Users.hasMany(models.Tasks);
    };

    Users.isPassword = function (encodedPassword, password){
        return bcrypt.compareSync(password, encodedPassword);
    };
    
    return Users;
};