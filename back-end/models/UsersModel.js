import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import Photo from './PhotoModel.js';

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    identification_document: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            len: [8, 10]
        }
    },
    gender: {
        type: DataTypes.ENUM('masculino', 'femenino'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    photo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Photo,
            key: 'id'
        }
    },
    rol: {
        type: DataTypes.ENUM('admin','user'),
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'users'
});

User.hasOne(Photo, { foreignKey: 'id', sourceKey: 'photo_id', as: 'photo' });
Photo.belongsTo(User, { foreignKey: 'photo_id' });

export default User;
