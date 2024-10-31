import db from '../config/database.js';
import { DataTypes } from 'sequelize';
import Province from './ProvincesModel.js';

const Localities = db.define('localities',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Province,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'localities'
});

Province.hasMany(Localities, { foreignKey: 'province_id' });
Localities.belongsTo(Province, { foreignKey: 'province_id' });

export default Localities;