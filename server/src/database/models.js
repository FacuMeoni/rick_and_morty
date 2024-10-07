import { sequelize } from "./database.js";
import { DataTypes } from "sequelize";

export const userModel = sequelize.define("User", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });


export const characterModel = sequelize.define("Character", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
        allowNull: false
    }, 
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

userModel.belongsToMany(characterModel, { through: 'Favorites', as: 'favorites' });
characterModel.belongsToMany(userModel, { through: 'Favorites', as: 'users' });