import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { posts } from "./Posts.js";
import { User } from "./Users.js";

class Comments extends Model { }

export const comments = Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            validate: {
                len: [1, 200000],
            },
        },
        postId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'comments',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    },
);