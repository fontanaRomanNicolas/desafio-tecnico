import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import Sports from './SportsModel.js';
import SportsEntities from './SportsEntitiesModel.js';

const SportsAvailabilities = db.define('sports_availabilities', {
    sports_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sports,
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
    total_scholarships: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scholarships_awarded: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vacancy_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'sports_availabilities',
    indexes: [
        {
            unique: true,
            fields: ['sports_id', 'sports_entity_id']
        }
    ]
});

Sports.hasMany(SportsAvailabilities, { foreignKey: 'sports_id', as: 'sports_availabilities' });
SportsEntities.hasMany(SportsAvailabilities, { foreignKey: 'sports_entity_id' });
SportsAvailabilities.belongsTo(Sports, { foreignKey: 'sports_id' });
SportsAvailabilities.belongsTo(SportsEntities, { foreignKey: 'sports_entity_id' });

export default SportsAvailabilities;
