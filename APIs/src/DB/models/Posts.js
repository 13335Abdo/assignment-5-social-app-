import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { comments } from "./Comments.js";

class Posts extends Model { }

export const posts = Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                len: [2, 200],
            },
        },
        content: {
            type: DataTypes.TEXT,
            validate: {
                len: [1, 200000],
            },
        },
        userId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'posts',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    },
);
