import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import User from './UsersModel.js';
import Sport from './SportsModel.js';
import SportsEntities from './SportsEntitiesModel.js';
import School from './SchoolsModel.js';

const ApplicationToSports = db.define('application_to_sports', {
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
    sport_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sport,
            key: 'id'
        }
    },
    sports_entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SportsEntities,
            key: 'id'
        }
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: School,
            key: 'id'
        }
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'application_to_sports',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'sport_id', 'sports_entity_id']
        }
    ]
});

User.hasMany(ApplicationToSports, { foreignKey: 'user_id', as: 'applications' });
Sport.hasMany(ApplicationToSports, { foreignKey: 'sport_id', as: 'applications' });
SportsEntities.hasMany(ApplicationToSports, { foreignKey: 'sports_entity_id', as: 'applications' });
School.hasMany(ApplicationToSports, { foreignKey: 'school_id', as: 'applications' });

ApplicationToSports.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
ApplicationToSports.belongsTo(Sport, { foreignKey: 'sport_id', as: 'sport' });
ApplicationToSports.belongsTo(SportsEntities, { foreignKey: 'sports_entity_id', as: 'sportsEntity' });
ApplicationToSports.belongsTo(School, { foreignKey: 'school_id', as: 'school' });

export default ApplicationToSports;