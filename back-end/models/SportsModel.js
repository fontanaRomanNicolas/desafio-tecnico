import db from '../config/database.js';
import { DataTypes } from 'sequelize';

const Sports = db.define('sports', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    type_of_sport: {
        type: DataTypes.ENUM('acuatico', 'combate', 'equipo', 'individual'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'sports'
});

export default Sports;
