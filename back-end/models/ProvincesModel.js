import db from '../config/database.js';
import { DataTypes } from 'sequelize';

const Province = db.define('provinces',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'provinces'
});

export default Province;