import db from '../config/database.js';
import { DataTypes } from 'sequelize';

const Photo = db.define('photos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type_photo: {
        type: DataTypes.ENUM('photo sport entity', 'photo school', 'photo of the document'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'photos'
});

export default Photo;
