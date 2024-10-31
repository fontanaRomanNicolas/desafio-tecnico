import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import User from './UsersModel.js';
import Localities from './LocalitiesModel.js';

const UserLocations = db.define('user_locations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    locality_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Localities,
            key: 'id'
        }
    },
    neighborhood: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    house_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'user_locations'
});

User.hasMany(UserLocations, { foreignKey: 'user_id' });
UserLocations.belongsTo(User, { foreignKey: 'user_id' });

Localities.hasMany(UserLocations, { foreignKey: 'locality_id' });
UserLocations.belongsTo(Localities, { foreignKey: 'locality_id' });

export default UserLocations;
