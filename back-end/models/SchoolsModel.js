import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import Localities from './LocalitiesModel.js';
import Photo from './PhotoModel.js';

const Schools = db.define('schools', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    locality_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Localities,
            key: 'id'
        }
    },
    phone_number: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    type_of_school: {
        type: DataTypes.ENUM('publica', 'privada'),
        allowNull: false
    },
    educational_level: {
        type: DataTypes.ENUM('primaria', 'secundaria', 'universidad'),
        allowNull: false
    },
    photo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Photo,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'schools'
});

Schools.belongsTo(Photo, { foreignKey: 'photo_id', as: 'photo' });
Schools.belongsTo(Localities, { foreignKey: 'locality_id', as: 'locality' });

Localities.hasMany(Schools, { foreignKey: 'locality_id', as: 'schools' });
Photo.belongsTo(Schools, { foreignKey: 'photo_id', as: 'school' });

export default Schools;