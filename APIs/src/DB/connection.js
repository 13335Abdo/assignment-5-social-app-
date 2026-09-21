import { Sequelize } from 'sequelize';



export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
);

export const DBConnection =async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log("erorr1", error);
    }
}

export const squlaizeConnection =async () => {
    try {

        await sequelize.sync({force:false , alter: false});
        console.log('Squlaize Connection has been established successfully.');
    
    } catch (error) {
        
        console.log("erorr", error);
    }
}


