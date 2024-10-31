import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import Photo from './PhotoModel.js';

const SportsEntities = db.define('sports_entities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    entity_type: {
        type: DataTypes.ENUM('club', 'asociación', 'federacion'),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(32),
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'sports_entities'
});

Photo.hasOne(SportsEntities, { foreignKey: 'photo_id' });
SportsEntities.belongsTo(Photo, { foreignKey: 'photo_id' });

export default SportsEntities;
