import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { comments } from "./Comments.js";
import { posts } from "./Posts.js";

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [2, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 100],
                    msg: "Password must be at least 6 characters long",
                },
            },
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            defaultValue: 'user',
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    },
);

