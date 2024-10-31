import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import ApplicationToSports from './ApplicationToSportsModel.js';

const ApplicationStatuses = db.define('application_statuses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    application_to_sport_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ApplicationToSports,
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'application_statuses'
});

ApplicationToSports.hasMany(ApplicationStatuses, {
    foreignKey: 'application_to_sport_id',
    as: 'statuses'
});
ApplicationStatuses.belongsTo(ApplicationToSports, {
    foreignKey: 'application_to_sport_id',
    as: 'application'
});

export default ApplicationStatuses;
